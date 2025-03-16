import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project import
import getColors from 'utils/getColors';

export default function Dot({ color, size, variant, sx }) {
  const theme = useTheme();

  // Agar color hex shaklida berilgan bo'lsa, uni to'g'ridan-to'g'ri ishlatamiz
  let bgColor = color;
  if (!color || (typeof color === 'string' && !color.startsWith('#'))) {
    // Agar color hex bo'lmasa, yoki undefined bo'lsa, getColors orqali olinadi
    const colors = getColors(theme, color || 'primary');
    bgColor = colors.main;
  }

  return (
    <Box
      sx={{
        width: size || 8,
        height: size || 8,
        borderRadius: '50%',
        bgcolor: variant === 'outlined' ? '' : bgColor,
        ...(variant === 'outlined' && { border: `1px solid ${bgColor}` }),
        ...sx
      }}
    />
  );
}

Dot.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number,
  variant: PropTypes.string,
  sx: PropTypes.any,
};
