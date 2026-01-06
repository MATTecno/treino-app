// src/ui/feedback/SwipeToDelete.tsx
import React, { useRef } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../design/theme';

type Props = {
    children: React.ReactNode;
    onDelete: () => void;
    containerStyle?: ViewStyle;
    actionWidth?: number;
};

export function SwipeToDelete({
    children,
    onDelete,
    containerStyle,
    actionWidth = 84,
}: Props) {
    const ref = useRef<Swipeable>(null);

    const handleDelete = () => {
        ref.current?.close();
        onDelete();
    };

    const renderRightActions = () => (
        <Pressable
            onPress={handleDelete}
            style={[styles.deleteBox, { width: actionWidth }]}
        >
            <Ionicons name="trash" size={22} color="#fff" />
        </Pressable>
    );

    return (
        <Swipeable
            ref={ref}
            renderRightActions={renderRightActions}
            overshootRight={false}
            rightThreshold={24}
            friction={2}
            containerStyle={containerStyle}
        >
            {children}
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    deleteBox: {
        backgroundColor: theme.colors.error,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: theme.radius.lg,
        borderBottomRightRadius: theme.radius.lg,
    },
});
