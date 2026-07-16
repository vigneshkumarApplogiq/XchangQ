import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/Button';
import { fonts } from '../../theme/fonts';
import { radius, spacing } from '../../theme/tokens';

export function FeedbackScreen() {
  const { theme } = useApp();
  const [message, setMessage] = useState('');

  const submit = () => {
    if (!message.trim()) {
      Alert.alert('Feedback', 'Please enter your feedback before submitting.');
      return;
    }
    Alert.alert(
      'Thank you!',
      'Your feedback has been noted. In a production build this would be sent to our support team.',
    );
    setMessage('');
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.hint, { color: theme.textSecondary }]}>
        Tell us what you think — features you love, bugs you found, or ideas for
        improvement.
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            color: theme.textPrimary,
          },
        ]}
        multiline
        numberOfLines={6}
        placeholder="Write your feedback here..."
        placeholderTextColor={theme.textTertiary}
        value={message}
        onChangeText={setMessage}
        textAlignVertical="top"
      />
      <Button label="Submit Feedback" onPress={submit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.lg },
  hint: {
    fontFamily: fonts.outfit.regular,
    fontSize: 14,
    lineHeight: 22,
  },
  input: {
    minHeight: 140,
    borderRadius: radius.card,
    borderWidth: 1,
    padding: spacing.lg,
    fontFamily: fonts.outfit.regular,
    fontSize: 15,
    lineHeight: 22,
  },
});
