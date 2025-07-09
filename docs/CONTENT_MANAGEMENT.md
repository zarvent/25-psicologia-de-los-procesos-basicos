# Content Management System Documentation

## Overview

This project implements a sophisticated content management system that ensures **fidelity between source material and deployed content**. The system addresses the critical issue identified in the Content Fidelity and Strategic Improvement Report.

## Architecture

### Single Source of Truth
- **Primary Source**: `materia-prima.md` - Contains the complete, authoritative content
- **Derived Content**: `_sections/*.md` - Individual section files generated from the source
- **Preservation**: Front matter and styling elements are preserved during synchronization

### Automated Synchronization
- **Script**: `scripts/sync-content.js` - Node.js script for content synchronization
- **Validation**: Content integrity validation using SHA-256 hashes
- **CI/CD**: GitHub Actions workflow for automated validation and synchronization

## Usage

### Manual Synchronization
```bash
# Synchronize content from source to sections
node scripts/sync-content.js sync

# Validate content integrity
node scripts/sync-content.js validate
```

### VS Code Tasks
- **Sync Content**: Runs synchronization script
- **Validate Content Integrity**: Validates content consistency

### GitHub Actions
- **On Push**: Validates content integrity
- **On Main Branch**: Auto-synchronizes content
- **On PR**: Validates proposed changes

## Content Structure

### Source File Format
The `materia-prima.md` file should follow this structure:
```markdown
# Psicología de los Procesos Básicos
[Introduction content]

# Antes de la psicología como ciencia
[History content]

# Psicología del sentido común
[Common sense psychology content]

# El Obstáculo:
[Obstacle content]

# Para que la psicología sea tomada en serio
[Scientific principles content]

# Conclusión:
[Conclusion content]
```

### Section Files
Section files in `_sections/` maintain:
- YAML front matter (title, subtitle, description, order, icon)
- Enhanced HTML/CSS for presentation
- Content synchronized from source

## Maintenance Guidelines

### Content Updates
1. **Always edit `materia-prima.md`** - Never edit section files directly
2. **Run synchronization** after source changes
3. **Validate integrity** before deployment
4. **Review changes** in section files to ensure proper formatting

### Quality Assurance
- Content hashes track changes automatically
- Validation detects drift between source and sections
- CI/CD prevents deployment of inconsistent content
- Manual review of generated content ensures quality

### Troubleshooting

#### Common Issues
1. **Hash Mismatch**: Run `node scripts/sync-content.js sync` to fix
2. **Missing Delimiters**: Ensure section headers exactly match CONFIG.DELIMITERS
3. **Front Matter Loss**: Script preserves existing front matter automatically
4. **Encoding Issues**: Ensure UTF-8 encoding for all files

#### Debug Mode
```bash
# Add debug logging
DEBUG=true node scripts/sync-content.js sync
```

## Performance Considerations

### Efficiency
- Hash-based change detection prevents unnecessary updates
- Incremental synchronization only updates changed sections
- Lightweight validation process suitable for CI/CD

### Scalability
- Modular architecture supports additional sections
- Configuration-driven approach enables easy expansion
- Automated processes reduce manual overhead

## Security

### Content Integrity
- SHA-256 hashing ensures content authenticity
- Automated validation prevents manual errors
- Version control tracks all changes

### Access Control
- GitHub Actions use repository secrets
- Automated commits use service account
- Manual synchronization requires local access

## Future Enhancements

### Planned Features
1. **Multilingual Support**: Content synchronization for multiple languages
2. **Advanced Validation**: Semantic content validation beyond hashing
3. **Visual Diff**: HTML preview of content changes
4. **Rollback Mechanism**: Automated content rollback on validation failure

### Integration Opportunities
- **CMS Integration**: Connect with headless CMS systems
- **Analytics**: Track content performance and engagement
- **A/B Testing**: Support for content variation testing

## Best Practices

### Development Workflow
1. Create feature branch
2. Edit `materia-prima.md`
3. Run synchronization locally
4. Review generated content
5. Commit all changes
6. Create pull request
7. Automated validation runs
8. Merge after approval

### Content Standards
- Maintain consistent formatting in source file
- Use semantic HTML in section files
- Preserve accessibility features
- Follow established style guidelines

## Monitoring

### Content Health
- GitHub Actions provide validation status
- Hash history tracks content evolution
- Error logs identify synchronization issues
- Performance metrics track processing time

### Alerting
- Failed validation triggers notifications
- Content drift alerts stakeholders
- Performance degradation warnings
- Security issue notifications

---

*This documentation is maintained as part of the Content Management System. For technical support, contact the development team.*
