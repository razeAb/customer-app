// app/signup.tsx
import { AntDesign, Feather } from "@expo/vector-icons";
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
  divider: "#ECECEE",
  danger: "#E5484D",
};

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const emailError = useMemo(() => {
    if (!email) return "";
    return /\S+@\S+\.\S+/.test(email) ? "" : "Please enter a valid email";
  }, [email]);
  const passError = useMemo(() => {
    if (!pass) return "";
    return pass.length >= 6 ? "" : "At least 6 characters";
  }, [pass]);
  const confirmError = useMemo(() => {
    if (!confirm) return "";
    return confirm === pass ? "" : "Passwords don’t match";
  }, [confirm, pass]);

  const canSubmit = !!name && !!email && !!pass && !!confirm && !emailError && !passError && !confirmError && !submitting;

  const onSubmit = async () => {
    if (!canSubmit) return;
    try {
      setSubmitting(true);
      // TODO: call your signup API
      await new Promise((r) => setTimeout(r, 700));
      router.replace("/"); // go to Home
    } catch {
      Alert.alert("Sign up failed", "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACING }} keyboardShouldPersistTaps="handled">
          <View style={styles.surface}>
            <Text style={styles.title}>Create Account</Text>

            {/* Name */}
            <View style={styles.inputWrap}>
              <Feather name="user" size={20} color={COLORS.sub} />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor={COLORS.sub}
                value={name}
                onChangeText={setName}
                returnKeyType="next"
              />
            </View>

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
            </View>
            {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

            {/* Password */}
            <View style={styles.inputWrap}>
              <Feather name="lock" size={20} color={COLORS.sub} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.sub}
                secureTextEntry={secure}
                value={pass}
                onChangeText={setPass}
                returnKeyType="next"
              />
              <Pressable onPress={() => setSecure((s) => !s)} hitSlop={10}>
                <Feather name={secure ? "eye-off" : "eye"} size={20} color={COLORS.sub} />
              </Pressable>
            </View>
            {!!passError && <Text style={styles.errorText}>{passError}</Text>}

            {/* Confirm */}
            <View style={styles.inputWrap}>
              <Feather name="lock" size={20} color={COLORS.sub} />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor={COLORS.sub}
                secureTextEntry={secure2}
                value={confirm}
                onChangeText={setConfirm}
                returnKeyType="go"
                onSubmitEditing={onSubmit}
              />
              <Pressable onPress={() => setSecure2((s) => !s)} hitSlop={10}>
                <Feather name={secure2 ? "eye-off" : "eye"} size={20} color={COLORS.sub} />
              </Pressable>
            </View>
            {!!confirmError && <Text style={styles.errorText}>{confirmError}</Text>}

            {/* Submit */}
            <Pressable onPress={onSubmit} disabled={!canSubmit} style={[styles.primaryBtn, !canSubmit && { opacity: 0.7 }]}>
              <Text style={styles.primaryBtnText}>{submitting ? "Creating…" : "Sign Up"}</Text>
            </Pressable>

            {/* Social */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={{ color: COLORS.sub, fontSize: 13, marginHorizontal: 8 }}>or continue with</Text>
              <View style={styles.divider} />
            </View>

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

            {/* Sign in link */}
            <View style={{ marginTop: 18, alignItems: "center" }}>
              <Text style={{ color: COLORS.sub }}>
                Already have an account?{" "}
                <Text onPress={() => router.push("/login")} style={styles.linkText}>
                  Sign In
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
  title: { fontSize: 24, fontWeight: "800", color: COLORS.text },
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
  input: { flex: 1, fontSize: 16, color: COLORS.text },
  errorText: { color: COLORS.danger, marginTop: 6, marginLeft: 6, fontSize: 12.5 },
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
  primaryBtnText: { color: "#fff", fontSize: 17, fontWeight: "800", letterSpacing: 0.3 },
  dividerRow: { marginTop: 18, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  divider: { height: 1, backgroundColor: COLORS.divider, flex: 1 },
  socialRow: { marginTop: 14, flexDirection: "row", columnGap: 12 },
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
  socialText: { fontSize: 15, color: COLORS.text, fontWeight: "700" },
  linkText: { color: COLORS.accent, fontSize: 14.5, fontWeight: "700" },
});
