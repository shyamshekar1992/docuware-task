import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Header = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h2" sx={{ fontFamily: 'Cursive', fontWeight: 'bold' }}>
                ToDos
            </Typography>
        </Box>
    );
};

export default Header;
