# 🏗️ PROJECT FRANKENSTEIN: DEFYING PLANNED OBSOLESCENCE 🏗️

> **"There is no such thing as an obsolete device, only boundaries that haven't been broken yet!"** 🚀🔥

A wake-up call to every developer who is comfortably coding for Android 14/15 while abandoning millions of "legacy" warriors... 

Do you think **Android 7** (API 24) or even **Android 5** (API 21) is dead? Do you believe supporting modern APIs like `java.nio.file` (NIO) or `java.time` on older hardware is an impossible mission? 

**YOU ARE WRONG.** That is just an excuse for a lack of optimization skills. ☠️😈

---

## 🧪 THE ULTIMATE WEAPON: `desugar_jdk_libs_nio:2.1.5` 🧪

We have performed a legendary "surgical operation": Forcing **NPatch/LSPatch** (originally designed for Android 8.1+) to run smoothly on an ancient **Android 7** device (Oppo F5). We stripped away the rotting C++ core and transplanted the **Epic Framework**. 💉🏗️

### Why MUST you use this today?
1.  **API Time Travel:** Bring the full power of Java 11/17 back to the API 21 era. 
2.  **Eliminate `NoClassDefFoundError`:** No more fear of missing classes when handling complex system files.
3.  **Device Liberation:** Smash the chains of "Planned Obsolescence" enforced by Big Tech.

---

## 🛠️ HOW TO "TRANSPLANT" THIS INTO YOUR PROJECT

In your `build.gradle` (Module: app), summon this magic to revive every device:

```gradle
android {
    compileOptions {
        // Enable the power of Core Library Desugaring
        coreLibraryDesugaringEnabled true
        
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    // The heart of ultimate backward compatibility
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs_nio:2.1.5")
}
