#!/usr/bin/env node

/**
 * Content Synchronization Script
 * ==============================
 *
 * Maintains fidelity between materia-prima.md (source of truth) and
 * individual section files in _sections directory.
 *
 * This script implements the architectural improvement proposed in the
 * Content Fidelity and Strategic Improvement Report.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  SOURCE_FILE: 'materia-prima.md',
  SECTIONS_DIR: '_sections',
  HASH_FILE: '.content-hashes.json',
  DELIMITERS: {
    INTRODUCCION: '# Psicología de los Procesos Básicos',
    HISTORIA: '# Antes de la psicología como ciencia',
    SENTIDO_COMUN: '# Psicología del sentido común',
    OBSTACULO: '# El Obstáculo:',
    PRINCIPIOS: '# Para que la psicología sea tomada en serio',
    CONCLUSION: '# Conclusión:'
  }
};

class ContentSynchronizer {
  constructor() {
    this.sourceContent = '';
    this.currentHashes = {};
    this.loadHashHistory();
  }

  /**
   * Load previous content hashes to detect changes
   */
  loadHashHistory() {
    try {
      const hashFile = path.join(process.cwd(), CONFIG.HASH_FILE);
      if (fs.existsSync(hashFile)) {
        this.currentHashes = JSON.parse(fs.readFileSync(hashFile, 'utf8'));
      }
    } catch (error) {
      console.warn('Could not load hash history:', error.message);
      this.currentHashes = {};
    }
  }

  /**
   * Save current content hashes
   */
  saveHashHistory() {
    try {
      const hashFile = path.join(process.cwd(), CONFIG.HASH_FILE);
      fs.writeFileSync(hashFile, JSON.stringify(this.currentHashes, null, 2));
    } catch (error) {
      console.error('Could not save hash history:', error.message);
    }
  }

  /**
   * Generate content hash for change detection
   */
  generateHash(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Read source content
   */
  readSourceContent() {
    try {
      const sourcePath = path.join(process.cwd(), CONFIG.SOURCE_FILE);
      this.sourceContent = fs.readFileSync(sourcePath, 'utf8');
      return true;
    } catch (error) {
      console.error('❌ Error reading source file:', error.message);
      return false;
    }
  }

  /**
   * Extract section content based on delimiters
   */
  extractSectionContent(sectionKey) {
    const delimiter = CONFIG.DELIMITERS[sectionKey];
    if (!delimiter) {
      throw new Error(`Unknown section: ${sectionKey}`);
    }

    const startIndex = this.sourceContent.indexOf(delimiter);
    if (startIndex === -1) {
      throw new Error(`Section delimiter not found: ${delimiter}`);
    }

    // Find the end of the section (next # header or end of file)
    const contentFromStart = this.sourceContent.substring(startIndex);
    const nextHeaderMatch = contentFromStart.match(/\n# (?!.*\n# )/);

    let sectionContent;
    if (nextHeaderMatch) {
      sectionContent = contentFromStart.substring(0, nextHeaderMatch.index);
    } else {
      sectionContent = contentFromStart;
    }

    return sectionContent.trim();
  }

  /**
   * Preserve front matter from existing section files
   */
  extractFrontMatter(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
      return frontMatterMatch ? frontMatterMatch[0] : '';
    } catch (error) {
      console.warn(`Could not extract front matter from ${filePath}:`, error.message);
      return '';
    }
  }

  /**
   * Check if content has changed
   */
  hasContentChanged(sectionKey, newContent) {
    const newHash = this.generateHash(newContent);
    const oldHash = this.currentHashes[sectionKey];

    if (oldHash !== newHash) {
      this.currentHashes[sectionKey] = newHash;
      return true;
    }
    return false;
  }

  /**
   * Update section file with new content
   */
  updateSectionFile(sectionKey, newContent) {
    const fileName = this.getSectionFileName(sectionKey);
    const filePath = path.join(process.cwd(), CONFIG.SECTIONS_DIR, fileName);

    // Preserve existing front matter
    const frontMatter = this.extractFrontMatter(filePath);

    // Combine front matter with new content
    const fullContent = frontMatter + '\n' + newContent;

    try {
      fs.writeFileSync(filePath, fullContent);
      return true;
    } catch (error) {
      console.error(`❌ Error updating ${fileName}:`, error.message);
      return false;
    }
  }

  /**
   * Get section file name
   */
  getSectionFileName(sectionKey) {
    const fileNames = {
      INTRODUCCION: 'introduccion.md',
      HISTORIA: 'historia.md',
      SENTIDO_COMUN: 'sentido-comun.md',
      OBSTACULO: 'obstaculo.md',
      PRINCIPIOS: 'principios.md',
      CONCLUSION: 'conclusion.md'
    };
    return fileNames[sectionKey] || `${sectionKey.toLowerCase()}.md`;
  }

  /**
   * Perform content synchronization
   */
  sync() {
    console.log('🔄 Starting content synchronization...');

    if (!this.readSourceContent()) {
      return false;
    }

    let updatedCount = 0;
    let errorCount = 0;

    for (const sectionKey of Object.keys(CONFIG.DELIMITERS)) {
      try {
        const sectionContent = this.extractSectionContent(sectionKey);

        if (this.hasContentChanged(sectionKey, sectionContent)) {
          if (this.updateSectionFile(sectionKey, sectionContent)) {
            console.log(`✅ Updated: ${this.getSectionFileName(sectionKey)}`);
            updatedCount++;
          } else {
            errorCount++;
          }
        } else {
          console.log(`⚡ No changes: ${this.getSectionFileName(sectionKey)}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${sectionKey}:`, error.message);
        errorCount++;
      }
    }

    this.saveHashHistory();

    console.log('\n📊 Synchronization Summary:');
    console.log(`   Updated files: ${updatedCount}`);
    console.log(`   Errors: ${errorCount}`);
    console.log(`   Total sections: ${Object.keys(CONFIG.DELIMITERS).length}`);

    return errorCount === 0;
  }

  /**
   * Validate content integrity
   */
  validate() {
    console.log('🔍 Validating content integrity...');

    if (!this.readSourceContent()) {
      return false;
    }

    let isValid = true;
    const sourceHash = this.generateHash(this.sourceContent);

    console.log(`Source content hash: ${sourceHash}`);

    for (const sectionKey of Object.keys(CONFIG.DELIMITERS)) {
      try {
        const sectionContent = this.extractSectionContent(sectionKey);
        const sectionHash = this.generateHash(sectionContent);
        const storedHash = this.currentHashes[sectionKey];

        if (storedHash && storedHash !== sectionHash) {
          console.log(`⚠️  Mismatch detected in ${sectionKey}`);
          isValid = false;
        } else {
          console.log(`✅ ${sectionKey}: Content integrity verified`);
        }
      } catch (error) {
        console.error(`❌ Validation error for ${sectionKey}:`, error.message);
        isValid = false;
      }
    }

    return isValid;
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'sync';

  const synchronizer = new ContentSynchronizer();

  switch (command) {
    case 'sync':
      const success = synchronizer.sync();
      process.exit(success ? 0 : 1);

    case 'validate':
      const isValid = synchronizer.validate();
      process.exit(isValid ? 0 : 1);

    case 'help':
    default:
      console.log(`
Content Synchronization Tool
============================

Usage: node sync-content.js [command]

Commands:
  sync      Synchronize content from source to sections (default)
  validate  Validate content integrity
  help      Show this help message

Examples:
  node sync-content.js sync
  node sync-content.js validate
            `);
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = ContentSynchronizer;
