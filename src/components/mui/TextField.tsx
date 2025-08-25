//component
import { TextField, useTheme } from "@mui/material";

//types
import type { TextFieldProps } from "@mui/material";

interface TextFieldCustomProps {
  label: string;
}

function TextFieldCustom({
  label,
  ...props
}: TextFieldCustomProps & TextFieldProps) {
  const theme = useTheme();

  return (
    <TextField
      sx={{
        "& input:-webkit-autofill": {
          WebkitBoxShadow: ` 0 0 0 100px ${theme.palette.background.default} inset !important`,
          WebkitTextFillColor: theme.palette.text.primary,
          caretColor: theme.palette.text.primary,
          borderRadius: "inherit",
        },
      }}
      {...props}
      label={label}
    />
  );
}

export default TextFieldCustom;
