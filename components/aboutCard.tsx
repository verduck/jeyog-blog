import { Card, Avatar, Typography, CardHeader, CardContent, CardActions, IconButton } from "@mui/material";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import EditableCard from "./editableCard";

interface About {
    id: number,
    name: string,
    job: string,
    introduction: string,
    githubUrl: string
}

export default function AboutCard({ about }: { about: About }) {
    return (
        <EditableCard>
            <CardHeader
                avatar={
                    <Avatar sx={{ width: '64px', height: '64px' }}>재영</Avatar>
                }
                title={about.name}
                titleTypographyProps={{ variant: 'h5' }}
                subheader={about.job}
                subheaderTypographyProps={{ variant: 'subtitle1' }}
            />
            <CardContent>
                <Typography component="div" variant="body1">{about.introduction}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'end' }}>
                <Link href={about.githubUrl}>
                    <IconButton>
                        <GitHubIcon />
                    </IconButton>
                </Link>
                <Link href="">
                    <IconButton>
                        <InstagramIcon />
                    </IconButton>
                </Link>
            </CardActions>
        </EditableCard>
    )
}