import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, useTheme, MD3Theme } from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  children: ReactNode | ReactNode[];
};

const BaseModal = ({ visible, onDismiss, title, children }: Props) => {
  const theme = useTheme();
  const makeStyles = ({ colors }: MD3Theme) =>
    StyleSheet.create({
      container: {
        margin: 20,
        borderRadius: 24,
        borderWidth: 4,
        borderColor: theme.colors.outline,
        padding: 0,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        marginBottom: 300,
      },
    });
  const styles = makeStyles(theme);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default BaseModal;
