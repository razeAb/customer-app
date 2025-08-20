// app/login.tsx
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SPACING = 16;
const RADIUS_XL = 24;
const COLORS = {
  bg: "#F3F3F5",
  card: "#FFFFFF",
  text: "#1D1D1F",
  sub: "#6E6E73",
  accent: "#FF8F2C",
  surface2: "#F2F2F3",
  shadow: "rgba(0,0,0,0.06)",
  divider: "#ECECEE",
  danger: "#E5484D",
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const emailError = useMemo(() => {
    if (!email) return "";
    const ok = /\S+@\S+\.\S+/.test(email);
    return ok ? "" : "Please enter a valid email";
  }, [email]);

  const canSubmit = email.length > 0 && password.length > 0 && !emailError && !submitting;

  const onSubmit = async () => {
    if (!canSubmit) return;
    try {
      setSubmitting(true);
      // TODO: call your API here
      await new Promise((r) => setTimeout(r, 700));
      router.replace("/"); // go to Home on success
    } catch (error) {
      console.error(error);
      Alert.alert("Sign in failed", "Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} style={{ flex: 1 }}>
        <ScrollView
          bounces
          contentContainerStyle={{ padding: SPACING }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.surface}>
            {/* Top row: circular menu + title + cart-style bubble (kept for visual parity) */}
            <View style={styles.topRow}>
              <View style={styles.circleBtn}>
                <Feather name="menu" size={22} color="#0F172A" />
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.titleTop}>Welcome Back</Text>
              </View>

              <View style={[styles.circleBtn, { backgroundColor: "#0E1B3D" }]}>
                <Ionicons name="person-outline" size={22} color="#fff" />
              </View>
            </View>

            {/* Greeting */}
            <Text style={styles.greeting}>
              Hey there, <Text style={{ fontWeight: "800" }}>Sign in to continue</Text>
            </Text>

            {/* Email */}
            <View style={styles.inputWrap}>
              <Feather name="mail" size={20} color={COLORS.sub} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={COLORS.sub}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
              />
              {email.length > 0 && !emailError ? <AntDesign name="checkcircle" size={18} color="#22C55E" /> : null}
            </View>
            {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

            {/* Password */}
            <View style={[styles.inputWrap, { marginTop: 12 }]}>
              <Feather name="lock" size={20} color={COLORS.sub} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.sub}
                secureTextEntry={secure}
                value={password}
                onChangeText={setPassword}
                returnKeyType="go"
                onSubmitEditing={onSubmit}
              />
              <Pressable onPress={() => setSecure((s) => !s)} hitSlop={10}>
                <Feather name={secure ? "eye-off" : "eye"} size={20} color={COLORS.sub} />
              </Pressable>
            </View>

            {/* Row: Remember me + Forgot */}
            <View style={styles.rowBetween}>
              <Pressable onPress={() => setRemember((r) => !r)} style={styles.rememberWrap}>
                <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                  {remember && <AntDesign name="check" size={14} color="#fff" />}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </Pressable>

              <Pressable onPress={() => Alert.alert("Forgot Password", "Implement flow…")}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Sign in button */}
            <Pressable
              onPress={onSubmit}
              disabled={!canSubmit}
              style={({ pressed }) => [styles.primaryBtn, (!canSubmit || pressed) && { opacity: 0.9 }]}
            >
              <Text style={styles.primaryBtnText}>{submitting ? "Signing in…" : "Sign In"}</Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={{ color: COLORS.sub, fontSize: 13, marginHorizontal: 8 }}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* Social buttons */}
            <View style={styles.socialRow}>
              <Pressable style={styles.socialBtn}>
                <AntDesign name="google" size={20} color="#DB4437" />
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
              <Pressable style={styles.socialBtn}>
                <AntDesign name="apple1" size={20} color="#111" />
                <Text style={styles.socialText}>Apple</Text>
              </Pressable>
            </View>

            {/* Sign up link */}
            <View style={{ marginTop: 18, alignItems: "center" }}>
              <Text style={{ color: COLORS.sub }}>
                Don’t have an account?{" "}
                <Text onPress={() => router.push("/signup")} style={[styles.linkText, { fontWeight: "700" }]}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS_XL,
    padding: SPACING,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface2,
    alignItems: "center",
    justifyContent: "center",
  },

  titleTop: {
    fontSize: 16,
    color: COLORS.sub,
    fontWeight: "700",
  },

  greeting: {
    marginTop: 18,
    fontSize: 22,
    color: COLORS.text,
  },

  inputWrap: {
    marginTop: 14,
    backgroundColor: COLORS.surface2,
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.danger,
    marginTop: 6,
    marginLeft: 6,
    fontSize: 12.5,
  },

  rowBetween: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#C8CDD6",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkboxOn: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  rememberText: {
    color: COLORS.text,
    fontSize: 14.5,
    fontWeight: "600",
  },
  linkText: {
    color: COLORS.accent,
    fontSize: 14.5,
    fontWeight: "700",
  },

  primaryBtn: {
    marginTop: 18,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  dividerRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    flex: 1,
  },

  socialRow: {
    marginTop: 14,
    flexDirection: "row",
    columnGap: 12,
  },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E8EE",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 8,
  },
  socialText: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "700",
  },
});
