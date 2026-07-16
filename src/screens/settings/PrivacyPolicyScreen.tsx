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

export function PrivacyPolicyScreen() {
  const { theme } = useApp();

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <InfoScreenLayout title="Privacy Policy">
        <Image source={appIcons.lg} style={styles.icon} accessibilityLabel="XchangeQ app icon" />
        <InfoLastUpdated>Last updated: July 15, 2026</InfoLastUpdated>

        <InfoParagraph>
          This Privacy Policy describes how XchangeQ handles information when you
          use our mobile currency conversion app on iOS and Android. XchangeQ is
          designed with privacy in mind: it works offline, requires no account,
          and keeps your data on your device.
        </InfoParagraph>
        <InfoParagraph>
          By using XchangeQ, you agree to the practices described below. If you do
          not agree, please discontinue use of the app.
        </InfoParagraph>

        <InfoSectionHeading>1. Overview</InfoSectionHeading>
        <InfoParagraph>
          XchangeQ is an offline-first currency converter that helps you convert
          between world currencies using mid-market exchange rates. The app can
          fetch the latest rates when you are online and stores them locally so
          conversions continue to work without a network connection.
        </InfoParagraph>
        <InfoHighlightBox>
          We do not require you to create an account, sign in, or provide
          personal information. We do not sell, rent, or share your personal data
          with third parties for marketing purposes.
        </InfoHighlightBox>

        <InfoSectionHeading>2. Information We Collect</InfoSectionHeading>
        <InfoParagraph>
          XchangeQ does not collect personal information such as your name,
          email address, phone number, postal address, government identifiers, or
          payment details. There is no user registration or login system.
        </InfoParagraph>
        <InfoParagraph>
          To provide core functionality, the app stores the following data only on
          your device using local storage (AsyncStorage). This data never leaves
          your device unless you explicitly share it through your operating
          system (for example, a screenshot):
        </InfoParagraph>
        <InfoParagraph>
          {`• Cached exchange rates — enables offline conversion after at least one sync
• Watchlist pairs — saves currency pairs and amounts you track
• App settings — theme, default currency, auto-refresh, and interval
• Recently used currencies — speeds up selection in the currency picker`}
        </InfoParagraph>
        <InfoParagraph>
          You can delete cached exchange rate data at any time through Settings →
          Clear Cache. Uninstalling the app removes all locally stored data from
          your device.
        </InfoParagraph>
        <InfoParagraph>
          XchangeQ does not collect analytics, advertising identifiers, precise
          location, contacts, photos, crash reports sent to third parties, or
          device fingerprints for profiling.
        </InfoParagraph>

        <InfoSectionHeading>3. How We Use Information</InfoSectionHeading>
        <InfoParagraph>
          Because all user-specific data remains on your device, we do not
          process your information on our servers. Locally stored data is used
          solely to perform conversions, display your watchlist, remember your
          preferences, show recently used currencies, and allow offline access to
          cached exchange rates.
        </InfoParagraph>

        <InfoSectionHeading>4. Internet Access & Third Parties</InfoSectionHeading>
        <InfoParagraph>
          When you are online, XchangeQ may connect to the internet to download
          the latest exchange rates. This occurs when you launch the app, tap
          refresh on the Convert screen, tap Sync in Settings, or when
          auto-refresh runs at your chosen interval.
        </InfoParagraph>
        <InfoParagraph>
          Exchange rate data is sourced from the Frankfurter API
          (api.frankfurter.app), a free, open-source currency data service
          operated by a third party. When rates are refreshed, your device sends
          a request to this service. Requests contain only the information needed
          to retrieve public exchange rate data (such as the base currency). No
          personal identifiers are included.
        </InfoParagraph>
        <InfoParagraph>
          XchangeQ does not integrate with Firebase Analytics, Crashlytics,
          AdMob, Facebook SDK, social login providers, or third-party marketing
          tools.
        </InfoParagraph>

        <InfoSectionHeading>5. Data Sharing & Disclosure</InfoSectionHeading>
        <InfoParagraph>
          We do not sell, trade, license, or otherwise disclose your personal
          information to third parties because we do not collect personal
          information in the first place.
        </InfoParagraph>
        <InfoParagraph>
          We may disclose information only if required by law, regulation, legal
          process, or governmental request, or if we believe disclosure is
          necessary to protect our rights, your safety, or the safety of others.
        </InfoParagraph>

        <InfoSectionHeading>6. App Permissions</InfoSectionHeading>
        <InfoParagraph>
          XchangeQ requests only the permissions necessary for core
          functionality. On Android, the INTERNET permission allows the app to
          download exchange rates when you are online. No other sensitive
          permissions (location, camera, microphone, contacts, or storage access)
          are required.
        </InfoParagraph>

        <InfoSectionHeading>7. Children's Privacy</InfoSectionHeading>
        <InfoParagraph>
          XchangeQ is not directed at children under 13, and we do not knowingly
          collect personal information from children. Because the app does not
          collect personal information from any user, it may be used by
          individuals of all ages under parental supervision.
        </InfoParagraph>

        <InfoSectionHeading>8. Data Retention & Security</InfoSectionHeading>
        <InfoParagraph>
          Locally stored data remains on your device until you clear the cache,
          reset app data, or uninstall the app. Cached exchange rates may be
          marked as stale after seven days without a successful refresh; you can
          still use stale rates offline until you sync again.
        </InfoParagraph>
        <InfoParagraph>
          Data on your device is protected by your operating system's built-in
          security. We recommend keeping your device software up to date and
          using a screen lock.
        </InfoParagraph>

        <InfoSectionHeading>9. Your Rights & Choices</InfoSectionHeading>
        <InfoParagraph>
          You control your data through in-app settings: change theme and
          currency preferences, clear cached rates, manage your watchlist, and
          disable auto-refresh. Because we do not operate user accounts, there is
          no remote profile to access or delete on our servers.
        </InfoParagraph>

        <InfoSectionHeading>10. Changes to This Policy</InfoSectionHeading>
        <InfoParagraph>
          We may update this Privacy Policy from time to time. When we do, we
          will revise the "Last updated" date at the top of this screen and in
          our hosted policy. Continued use of XchangeQ after changes constitutes
          acceptance of the updated policy.
        </InfoParagraph>

        <InfoSectionHeading>11. Contact Us</InfoSectionHeading>
        <InfoParagraph>
          If you have questions or concerns about this Privacy Policy or our data
          practices, contact us at support@xchangq.app with the subject line
          "Privacy Policy Inquiry." We aim to respond within 30 days.
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
