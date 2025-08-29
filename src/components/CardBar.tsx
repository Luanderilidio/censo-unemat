import { MdInsertChartOutlined } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useBoolean } from "react-hooks-shareable";

interface CardBarProps {
  title: string;
  subtitle: string;
  titleDialog: string;
  descriptionDialog: string;
  children: React.ReactNode;
}

export default function CardBar({
  title,
  subtitle,
  titleDialog,
  descriptionDialog,
  children,
}: CardBarProps) {
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  return (
    <div className="w-full !h-96 border-red-500 rounded-lg bg-white shadow-md">
      <div className="flex px-4 pt-4 pb-2 border-b items-center justify-between gap-1 text-black/70">
        <div className="flex items-center gap-1 justify-start">
          <MdInsertChartOutlined size={18} />
          <h1 className="font-semibold text-sm">Grafico de Barras</h1>
        </div>
        <IconButton onClick={openDialog}>
          <FaQuestionCircle size={20} className="text-black/10" />
        </IconButton>
      </div>
      <div className="flex px-4 pt-4 pb-2  items-center justify-between gap-1 text-black/70">
        <div className="flex flex-col items-start gap-1 justify-start">
          <h1 className="font-bold text-xl">{title}</h1>
          <h2 className="font-normal leading-none ">{subtitle}</h2>
        </div>
      </div>
      <div className="chart-wrapper !h-60 px-2 border-red-500">{children}</div>

      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">{titleDialog}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {descriptionDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
