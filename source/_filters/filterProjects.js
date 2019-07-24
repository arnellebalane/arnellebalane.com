module.exports = projects => {
    return projects.filter(project => project.type === 'project');
};
