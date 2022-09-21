
import { Box } from '@mui/material'
import Image from 'next/image'

export default function Footer() {
    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            padding: '2rem 0',
            borderTop: '1px solid #eaeaea',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'background.default',
            color: 'text.primary'
        }} component="footer">
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <span>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
            </a>
        </Box>
    )
}