import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { appIcons } from '../../assets/icons';
import { useApp } from '../../context/AppContext';
import {
  InfoHighlightBox,
  InfoLastUpdated,
  InfoParagraph,
  InfoScreenLayout,
  InfoSectionHeading,
} from '../../components/ScreenLayout';
import { spacing } from '../../theme/tokens';

export function TermsScreen() {
  const { theme } = useApp();

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <InfoScreenLayout title="Terms & Conditions">
        <Image source={appIcons.lg} style={styles.icon} accessibilityLabel="XchangeQ app icon" />
        <InfoLastUpdated>Last updated: July 15, 2026</InfoLastUpdated>

        <InfoParagraph>
          These Terms & Conditions ("Terms") govern your use of the XchangeQ
          mobile application ("the App") on iOS and Android. By installing,
          accessing, or using XchangeQ, you agree to be bound by these Terms. If
          you do not agree, do not use the App.
        </InfoParagraph>

        <InfoSectionHeading>1. Description of Service</InfoSectionHeading>
        <InfoParagraph>
          XchangeQ is an offline-first currency converter that displays
          mid-market exchange rates and helps you convert amounts between world
          currencies. The App fetches live rates from the Frankfurter API when
          you are online and caches them locally so conversions can continue
          without a network connection.
        </InfoParagraph>
        <InfoParagraph>
          XchangeQ is provided free of charge for personal, non-commercial use.
          Features may change, be added, or be removed in future updates without
          prior notice.
        </InfoParagraph>

        <InfoSectionHeading>2. Exchange Rate Disclaimer</InfoSectionHeading>
        <InfoHighlightBox>
          Exchange rates shown in XchangeQ are indicative mid-market estimates
          for informational purposes only. They are not financial advice and
          should not be relied upon for trading, investment, tax, or legal
          decisions.
        </InfoHighlightBox>
        <InfoParagraph>
          Rates displayed in the App may differ from rates offered by banks,
          card issuers, payment processors, currency exchanges, or other
          financial institutions. Actual transaction amounts may include fees,
          spreads, rounding, or timing differences that XchangeQ does not
          reflect.
        </InfoParagraph>
        <InfoParagraph>
          Rate data is sourced from third-party services and may be delayed,
          incomplete, or temporarily unavailable. Cached rates may become stale
          when you are offline or when a sync has not occurred recently.
        </InfoParagraph>

        <InfoSectionHeading>3. Acceptable Use</InfoSectionHeading>
        <InfoParagraph>
          You agree to use XchangeQ only for lawful personal purposes. You must
          not:
        </InfoParagraph>
        <InfoParagraph>
          {`• Reverse engineer, decompile, or attempt to extract the App's source code except where permitted by law
• Interfere with or disrupt the App, its servers, or connected services
• Use the App in any way that violates applicable laws or regulations
• Misrepresent XchangeQ outputs as official bank or institutional rates`}
        </InfoParagraph>

        <InfoSectionHeading>4. No Account; Local Data</InfoSectionHeading>
        <InfoParagraph>
          XchangeQ does not require user registration. Your watchlist,
          preferences, and cached rates are stored locally on your device. You are
          responsible for maintaining your device and any data you choose to
          keep in the App.
        </InfoParagraph>

        <InfoSectionHeading>5. Third-Party Services</InfoSectionHeading>
        <InfoParagraph>
          Exchange rate data is provided by the Frankfurter API
          (api.frankfurter.app), an independent third-party service. We do not
          control Frankfurter's availability, accuracy, or policies. Your use of
          rate data retrieved through the App is also subject to any terms or
          limitations described by that service.
        </InfoParagraph>
        <InfoParagraph>
          The App may also rely on your device's operating system and network
          provider for connectivity. We are not responsible for failures caused
          by third-party infrastructure outside our control.
        </InfoParagraph>

        <InfoSectionHeading>6. Intellectual Property</InfoSectionHeading>
        <InfoParagraph>
          XchangeQ, including its name, logo, design, and software, is owned by
          its developers and protected by applicable intellectual property laws.
          These Terms do not grant you any right to use our branding or
          materials except as necessary to use the App in accordance with these
          Terms.
        </InfoParagraph>

        <InfoSectionHeading>7. Disclaimer of Warranties</InfoSectionHeading>
        <InfoParagraph>
          THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF
          ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, ACCURACY, AND NON-INFRINGEMENT.
        </InfoParagraph>
        <InfoParagraph>
          We do not warrant that the App will be uninterrupted, error-free,
          secure, or free of harmful components, or that exchange rates will be
          current or suitable for any particular transaction.
        </InfoParagraph>

        <InfoSectionHeading>8. Limitation of Liability</InfoSectionHeading>
        <InfoParagraph>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, XCHANGEQ AND ITS
          DEVELOPERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR
          GOODWILL, ARISING FROM YOUR USE OF OR INABILITY TO USE THE APP.
        </InfoParagraph>
        <InfoParagraph>
          IN NO EVENT SHALL OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR
          RELATING TO THE APP EXCEED THE AMOUNT YOU PAID TO USE THE APP IN THE
          TWELVE MONTHS PRECEDING THE CLAIM, OR ZERO IF THE APP WAS PROVIDED FREE
          OF CHARGE.
        </InfoParagraph>
        <InfoParagraph>
          Some jurisdictions do not allow certain limitations of liability, so
          some of the above limitations may not apply to you.
        </InfoParagraph>

        <InfoSectionHeading>9. Indemnification</InfoSectionHeading>
        <InfoParagraph>
          You agree to indemnify and hold harmless XchangeQ and its developers
          from any claims, damages, losses, or expenses (including reasonable
          legal fees) arising from your misuse of the App or violation of these
          Terms.
        </InfoParagraph>

        <InfoSectionHeading>10. Termination</InfoSectionHeading>
        <InfoParagraph>
          You may stop using XchangeQ at any time by uninstalling the App. We may
          suspend or discontinue the App or any part of it at our discretion. Upon
          termination, sections that by their nature should survive (including
          disclaimers, limitations of liability, and indemnification) will
          continue to apply.
        </InfoParagraph>

        <InfoSectionHeading>11. Changes to These Terms</InfoSectionHeading>
        <InfoParagraph>
          We may update these Terms from time to time. When we do, we will revise
          the "Last updated" date above. Your continued use of XchangeQ after
          changes become effective constitutes acceptance of the revised Terms.
        </InfoParagraph>

        <InfoSectionHeading>12. Governing Law</InfoSectionHeading>
        <InfoParagraph>
          These Terms are governed by the laws applicable in your place of
          residence, except where mandatory local consumer protection laws
          provide otherwise. Any disputes shall be resolved in the courts of
          competent jurisdiction in that location, unless applicable law requires
          a different forum.
        </InfoParagraph>

        <InfoSectionHeading>13. Contact</InfoSectionHeading>
        <InfoParagraph>
          Questions about these Terms? Contact us at support@xchangq.app with the
          subject line "Terms Inquiry."
        </InfoParagraph>
      </InfoScreenLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginBottom: spacing.md,
  },
});
