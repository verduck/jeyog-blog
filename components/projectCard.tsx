import { Project } from '@@types/project'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

interface ProjectCardProps {
    project: Project
 }

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
         <Card variant="outlined" sx={{ width: '400', height: '600', borderRadius: '10px' }}>
            <CardActionArea href={`/projects/${project.id}`}>
                <CardMedia component="img" alt="project thumbnail" width="128" height="128" image={project.thumbnail} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {project.name}
                    </Typography>
                    프로젝트 간단 설명
                </CardContent>
            </CardActionArea>
        </Card>
    )
}