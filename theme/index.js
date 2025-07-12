const fs = require('fs');
const path = require('path');

module.exports = {
  render: function(resume) {
    const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resume.basics.name} - ${resume.basics.label}</title>
    <style>${css}</style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="header-content">
                <div class="profile-section">
                    ${resume.basics.picture ? `<img src="${resume.basics.picture}" alt="${resume.basics.name}" class="profile-image">` : ''}
                    <div class="profile-info">
                        <h1 class="name">${resume.basics.name}</h1>
                        <h2 class="label">${resume.basics.label}</h2>
                        <p class="summary">${resume.basics.summary || ''}</p>
                    </div>
                </div>
                <div class="contact-info">
                    ${resume.basics.email ? `<div class="contact-item">📧 ${resume.basics.email}</div>` : ''}
                    ${resume.basics.location ? `<div class="contact-item">📍 ${resume.basics.location.city}, ${resume.basics.location.region}</div>` : ''}
                    ${resume.basics.profiles ? resume.basics.profiles.map(profile => 
                        `<div class="contact-item">🔗 <a href="https://${profile.network.toLowerCase()}.com/${profile.username}" target="_blank">${profile.network}</a></div>`
                    ).join('') : ''}
                </div>
            </div>
        </header>

        <main class="main-content">
            ${resume.work ? `
            <section class="section">
                <h3 class="section-title">Work Experience</h3>
                <div class="section-content">
                    ${resume.work.map(job => `
                    <div class="experience-item">
                        <div class="experience-header">
                            <h4 class="job-title">${job.position}</h4>
                            <div class="company-info">
                                <span class="company">${job.company}</span>
                                <span class="date">${job.startDate}${job.endDate ? ` - ${job.endDate}` : ' - Present'}</span>
                            </div>
                        </div>
                        <p class="job-summary">${job.summary || ''}</p>
                        ${job.highlights ? `
                        <ul class="highlights">
                            ${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                        ` : ''}
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${resume.skills ? `
            <section class="section">
                <h3 class="section-title">Skills</h3>
                <div class="section-content">
                    <div class="skills-grid">
                        ${resume.skills.map(skill => `
                        <div class="skill-item">
                            <h4 class="skill-name">${skill.name}</h4>
                            <div class="skill-level skill-level-${skill.level}">${skill.level}</div>
                            <div class="skill-keywords">
                                ${skill.keywords ? skill.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('') : ''}
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            ` : ''}

            ${resume.publications ? `
            <section class="section">
                <h3 class="section-title">Publications & Projects</h3>
                <div class="section-content">
                    ${resume.publications.map(pub => `
                    <div class="publication-item">
                        <h4 class="publication-title">
                            <a href="${pub.website}" target="_blank">${pub.name}</a>
                        </h4>
                        <div class="publication-meta">
                            <span class="publisher">${pub.publisher}</span>
                            <span class="date">${pub.releaseDate}</span>
                        </div>
                        <p class="publication-summary">${pub.summary || ''}</p>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${resume.education ? `
            <section class="section">
                <h3 class="section-title">Education</h3>
                <div class="section-content">
                    ${resume.education.map(edu => `
                    <div class="education-item">
                        <h4 class="degree">${edu.studyType} in ${edu.area}</h4>
                        <div class="institution">${edu.institution}</div>
                        <div class="date">${edu.startDate} - ${edu.endDate}</div>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${resume.awards ? `
            <section class="section">
                <h3 class="section-title">Certifications</h3>
                <div class="section-content">
                    ${resume.awards.map(award => `
                    <div class="award-item">
                        <h4 class="award-title">${award.title}</h4>
                        <div class="award-meta">
                            <span class="awarder">${award.awarder}</span>
                            <span class="date">${award.date}</span>
                        </div>
                        ${award.summary ? `<div class="award-summary">${award.summary}</div>` : ''}
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </main>
    </div>
</body>
</html>
    `;
  }
};