import { useCallback, useState } from "react";

interface UsePageModalReturn {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  getActionButton: (
    label: string,
    icon?: React.ReactNode,
  ) => {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}

export const usePageModal = (): UsePageModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const getActionButton = useCallback(
    (label: string, icon?: React.ReactNode) => ({
      label,
      icon,
      onClick: openModal,
    }),
    [openModal],
  );

  return {
    isModalOpen,
    openModal,
    closeModal,
    getActionButton,
  };
};
