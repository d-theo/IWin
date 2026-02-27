import React, { ReactNode } from "react";
import { Modal, Portal, useTheme } from "react-native-paper";
import { AppTheme } from "../theme/theme";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  children: ReactNode | ReactNode[];
};

const BaseModal = ({ visible, onDismiss, children }: Props) => {
  const theme = useTheme<AppTheme>();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          margin: 20,
          marginBottom: 300,
          borderRadius: theme.borderRadius.l,
          borderWidth: theme.borderWidth.m,
          borderColor: theme.colors.outline,
          backgroundColor: theme.colors.surface,
          padding: 0,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOpacity: 0.2,
        }}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default BaseModal;
