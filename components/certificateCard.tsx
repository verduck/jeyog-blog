import { Card, CardContent, CardHeader, Chip, Grid } from "@mui/material"
import EditableCard from "./editableCard"

interface Certificate {
    id: number,
    name: string,
    date: string
}

export default function CertificateCard({ certificates } : { certificates: Certificate[] }) {
    return (
        <EditableCard>
            <CardHeader title="📝 자격증" />
            <CardContent>
                <Grid container spacing={1}>
                    {certificates.map((c) => (
                        <Grid key={c.id} item>
                            <Chip label={c.name} />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </EditableCard>
    )
}