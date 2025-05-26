import { Modal, Box, IconButton } from '@mui/material';
import { IoCloseSharp } from "react-icons/io5";

const ReusableModal = ({
    open,
    onClose,
    children,
    width = 'w-full max-w-lg',
    title = '',
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-white backdrop-blur-2xl p-6 rounded-lg shadow-lg
          ${width}
        `}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 id="modal-title" className="text-lg font-semibold text-secondary-blue ">
                        {title}
                    </h2>
                    <IconButton onClick={onClose} className="text-gray-500 hover:text-secondary-blue">
                        <IoCloseSharp />
                    </IconButton>
                </div>
                <div id="modal-description">{children}</div>
            </Box>
        </Modal>
    )
}

export default ReusableModal
