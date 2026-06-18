import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LOCALE_KEY = "cv_locale";

const resources = {
  en: {
    translation: {
      languages: {
        en: "English",
        it: "Italiano",
        de: "Deutsch",
        es: "Español",
        sq: "Shqip",
      },

      adminUsers: {
        title: "Users",
        searchPlaceholder: "Search name/email/personal id",
        noResults: "No users found.",

        filters: {
          allRoles: "All roles",
          all: "All",
          active: "Active",
          suspended: "Suspended",
        },

        table: {
          name: "Name",
          personalId: "Personal ID",
          email: "Email",
          role: "Role",
          active: "Active",
          actions: "Actions",
        },

        actions: {
          apply: "Apply",
          make: "Make",
          suspend: "Suspend",
          activate: "Activate",
        },

        errors: {
          loadFail: "Failed to load users",
          roleFail: "Failed to update role",
          statusFail: "Failed to update status",
        },
      },


      myReports: {
        title: "My Reports",
        subtitle: "Track and manage your submitted reports.",
        searchPlaceholder: "Search reports...",
        sortPrefix: "Sort by",
        saveFilters: "Save filters",
        filtersSaved: "Filters saved successfully.",
        noResults: "No reports found.",
        errors: {
          loadFail: "Failed to load reports.",
        },
        labels: {
          status: "Status",
          city: "City",
          reportedAt: "Reported at",
        },
        issuePhotoAlt: "Issue photo",
      },

      report: {
        title: "Report an Issue",
        subtitle: "Help improve your city by reporting problems.",

        tips: {
          clearTitle: "Use a clear title",
          addLocation: "Add location if possible",
          photoHelps: "Photo helps faster resolution",
        },

        sections: {
          details: "Issue details",
          detailsSub: "Tell us what happened and where.",
        },

        fields: {
          issueTitle: "Issue title",
          category: "Category",
          city: "City",
          description: "Description",
          photo: "Photo",
          map: "Map Location (optional)",
        },

        placeholders: {
          issueTitle: "Short and clear title",
          city: "Enter city",
          description: "Describe the issue...",
        },

        hints: {
          title: "Example: “Pothole near Central Ave causing traffic.”",
          description: "Include what you saw, duration, and safety concerns.",
          submit: "After submitting, you can track progress in “My Reports”.",
          map: "Click on the map to pin the location.",
          noLocation: "No location selected. You can submit without a location.",
        },

        actions: {
          useMyLocation: "Use my location",
          reset: "Reset",
          submit: "Submit Report",
          submitting: "Submitting...",
          removePhoto: "Remove",
          clearMarker: "Clear",
          noMarker: "No marker set",
        },

        upload: {
          title: "Add a photo (optional)",
          subtitle: "JPG/PNG • up to 5MB • helps verification",
          button: "Choose file",
        },

        errors: {
          required: "Please fill all required fields.",
          titleShort: "Title is too short.",
          descShort: "Description is too short.",
          imageOnly: "Please upload an image file.",
          imageTooLarge: "Image is too large (max 5MB).",
          geoNotSupported: "Geolocation is not supported.",
          geoDenied: "Location permission denied.",
          loginRequired: "You must login first.",
          submitFail: "Failed to submit report.",
        },

        selected: "Selected",

        side: {
          title: "What happens next?",
          step1: "Your report is saved and shown to admins.",
          step2: "Admins review and update status.",
          step3: "Track changes in “My Reports”.",
        },
      },

      nav: {
        report: "Report",
        myReports: "My Reports",
        community: "Community",
        helpCenter: "Help Center",
        howItWorks: "How it works",
        faqs: "FAQs",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
      },

      auth: {
        signupTitle: "Signup",
        dontHaveAccount: "Do not have an account yet?",
        createAccount: "Create account",
        alreadyHaveAccount: "Already have an account?",
        password: "Password",
        agreeText: "I confirm my details are correct",
        passwordMismatch: "Passwords do not match",
        mustConfirm: "Please confirm the checkbox.",
        accountCreated: "Account created",
        loginFailed: "Login failed",
        signupFailed: "Signup failed",
      },

      common: {
        in_progress: "In Progress",
        loading: "Loading...",
        saving: "Saving...",
        uploading: "Uploading...",
        save: "Save",
        cancel: "Cancel",
        reset: "Reset",
        searchPlaceholder: "Search...",
        anyStatus: "Any status",
        pending: "Pending",
        inProgress: "In Progress",
        resolved: "Resolved",
        rejected: "Rejected",
        sortNewest: "Newest",
        sortOldest: "Oldest",
        sortStatus: "Status",
        prev: "Prev",
        next: "Next",
        page: "Page",
        of: "of",
        perPage: "{{n}} per page",
        open: "Open",
        copy: "Copy",
        yes: "Yes",
        no: "No",
        signedInAs: "Signed in as",
        role: "Role",
        active: "Active",
        memberSince: "Member since",
        profileCompletion: "Profile completion",
        improveProfileHint: "Add phone/city/photo to improve your profile.",
        accountOverview: "Account overview",
        session: "Session",
        endSessionHint: "End this session on this device.",
        openBtn: "Open",

        // ✅ used in Settings.jsx displayName fallback
        admin: "Admin",
        citizen: "Citizen",
      },

      home: {
        title: "Welcome to CitizenVoice",
        continueGuest: "Continue as a guest",
      },

      citizenHome: {
        top: {
          notifications: "Notifications",
          profile: "Profile",
          settings: "Settings",
        },
        cta: {
          start: "Start →",
          view: "View →",
          explore: "Explore →",
        },
        helpCenter: {
          title: "Help Center",
          subtitle: "Guides + common questions",
          links: {
            how: "How it works",
            faqs: "FAQs",
            contact: "Contact support",
            ask: "Ask a question",
          },
          tip: "Tip: If you don’t find an answer in FAQs, use “Ask a question”.",
        },
        resources: {
          title: "Resources",
          subtitle: "Useful information for citizens",
          tiles: {
            city: "City resources",
            citySub: "Services & contacts",
            feed: "Community feed",
            feedSub: "See what’s happening",
            track: "Track progress",
            trackSub: "Statuses & updates",
            newReport: "New report",
            newReportSub: "Create a report quickly",
          },
        },
        footer: {
          title: "Want faster help?",
          subtitle: "Check FAQs first or contact support if it’s urgent.",
          faqs: "FAQs",
          contact: "Contact",
        },

        welcome: "Welcome to CitizenVoice",
        subtitle:
          "Your community matters. Report issues, track progress, and stay informed.",
        actions: {
          report: {
            title: "Report an Issue",
            desc: "Submit a new issue for your neighborhood.",
          },
          myReports: {
            title: "My Reports",
            desc: "View the status of your submitted reports.",
          },
          community: {
            title: "Community Issues",
            desc: "See issues reported by other citizens.",
          },
        },
        alerts: {
          seeAll: "See all →",
          title: "Community Alerts",
          water: "Water supply maintenance on Friday (8:00 AM to 5:00 PM).",
          road: "Road repairs in Central Ave — expect slower traffic.",
        },
      },

      contact: {
        title: "Contact",
        subtitle: "Send us a message and we’ll get back to you.",
        fields: {
          email: "Email",
          phone: "Phone number",
          topic: "Topic",
          description: "Description",
        },
        placeholders: {
          email: "example@email.com",
          topic: "Subject",
          description: "Write your message...",
          phone: "Phone number",
        },
        submit: "Submit",
        sending: "Sending...",
        success: "✅ Message sent successfully!",
      },

      community: {
        title: "Community Reports",
        subtitle: "Issues reported by citizens in your community.",
        guestNotice:
          "You are browsing as a guest. Log in to report issues, like, or comment.",
        searchPlaceholder: "Search title/description...",
        cityPlaceholder: "City",
        categoryPlaceholder: "Category",
        sortPrefix: "Sort:",
        saveFilters: "Save Filters",
        filtersSaved: "✅ Filters saved",
        loginToInteract: "Login to interact →",
        loading: "Loading community issues...",
        noResults: "No community issues found.",
        viewDetails: "View details →",
        like: "🤍 Like",
        liked: "❤️ Liked",
        loginRequiredLike: "Login required to like reports.",
        loginRequiredComment: "Login required to comment.",
        loginRequiredTooltip: "Login required",
        issuePhotoAlt: "issue",
        comments: "Comments",
        loadComments: "Load comments",
        hideComments: "Hide comments",
        loginToComment: "Login to comment",
        loginToCommentPlaceholder: "Login to comment...",
        writeComment: "Write a comment...",
        post: "Post",
        moreComments: "+{{n}} more comments",
        noCommentsYet: "No comments yet.",
        perPage: "{{n}} / page",
        labels: {
          category: "Category",
          city: "City",
          status: "Status",
          reportedAt: "Reported at",
        },
      },

      admin: {
        brand: "CitizenVoice Admin",
        roleTag: "ADMIN",
        nav: {
          dashboard: "Dashboard",
          reports: "Reports",
          analytics: "Analytics",
          users: "Users",
          auditLog: "Audit Log",
          notifications: "Notifications",
        },
        reports: {
          all: "All",
        },
        analytics: {
          title: "Analytics",
          loginRequired: "Login required (missing token).",
          invalidResponse: "Server returned invalid response.",
          cards: {
            total: "Total Reports",
          },
          statusBreakdown: "Status breakdown",
          topCities: "Top cities",
          byCategory: "Reports by category",
          monthlyTrend: "Monthly trend",
        },
      },

      adminHome: {
        contacts: {
          title: "Contact Messages",
          empty: "No contact messages yet.",

          cols: {
            email: "Email",
            phone: "Phone",
            topic: "Topic",
            message: "Message",
            date: "Date",
            status: "Status",
          },

          status: {
            new: "New",
            read: "Read",
            archived: "Archived",
          },
        },
        welcome: "Welcome to CitizenVoice",
        title: "Admin Dashboard",
        subtitle: "Manage reports, citizens, and community data.",
        cards: {
          totalReports: "Total Reports",
        },
        recent: {
          title: "Recent Reports",
          cols: { issue: "Issue", citizen: "Citizen", status: "Status", date: "Date" },
          empty: "No reports found",
        },
        alerts: {
          title: "Alerts & Notifications",
          highVolume: "High volume of new reports today.",
          maintenance: "System maintenance scheduled for Friday.",
        },
      },

      errors: {
        failedToLoadCommunity: "Failed to load community reports",
        failedToLoadComments: "Failed to load comments",
        likeFailed: "Failed to update like",
        commentFailed: "Failed to post comment",
      },

      profilePro: {
        title: "My Profile",
        signedInAs: "Signed in as",
        tabs: {
          overview: "Overview",
          edit: "Edit profile",
          security: "Security",
        },
        photoHint: "JPG/PNG, recommended square image.",
        memberSince: "Member since",
        accountOverview: {
          title: "Account overview",
        },
        role: "Role",
        completion: {
          title: "Profile completion",
          hint: "Add phone/city/photo to improve your profile.",
        },
        actions: {
          editProfile: "Edit profile",
        },
      },

      help: {
        how: {
          title: "How it works",
          subtitle:
            "CitizenVoice helps you report problems, track progress, and improve your community together.",

          ctaFaq: "View FAQs",
          ctaContact: "Contact us",

          steps: {
            guest: {
              title: "Browse as guest",
              desc:
                "You can view community issues without logging in. Filters help you find reports by city, category, and status.",
            },
            account: {
              title: "Create an account",
              desc:
                "Sign up as a citizen to submit reports and interact with community issues.",
            },
            report: {
              title: "Create a report",
              desc: "Tell us what’s happening in your area in under a minute.",
            },
            track: {
              title: "Track updates",
              desc: "You can follow your report as the status changes.",
            },
            admin: {
              title: "Admin review",
              desc: "Admins review, prioritize, and manage incoming issues.",
            },
            informed: {
              title: "Stay informed",
              desc:
                "The community page shows what’s trending. Notifications and email digests can be added later.",
            },
          },

          footer: {
            title: "Need help with a specific problem?",
            desc:
              "Check the FAQs or contact support with details (including your Personal ID).",
          },
        },

        /* =========================
   ✅ EN (put inside: en.translation.help.faqs)
   ========================= */
        faqs: {
          title: "FAQs",
          subtitle: "Quick answers about reporting, tracking, accounts, and support.",
          search: "Search questions...",
          clear: "Clear",
          noResultsTitle: "No results",
          noResultsBody: "Try different keywords.",
          openQuestion: "Open question",
          categories: {
            general: "General",
            accountAccess: "Account & Access",
            reporting: "Reporting",
            statusTracking: "Status & Tracking",
            community: "Community",
            admin: "Admin",
            profileSettings: "Profile & Settings",
            privacySecurity: "Privacy & Security",
            technical: "Technical",
            roadmap: "Roadmap",
          },
          items: {
            whatIsCitizenVoice: {
              q: "What is CitizenVoice?",
              a: "CitizenVoice is a platform that allows citizens to report community issues, track their progress, and stay informed about what’s happening in their area.",
            },
            whoCanUse: {
              q: "Who can use CitizenVoice?",
              a: "Anyone can browse community reports as a guest. To submit reports or interact (like/comment), you need to create an account and log in.",
            },
            isItFree: {
              q: "Is CitizenVoice free to use?",
              a: "Yes, CitizenVoice is free for citizens.",
            },
            supportedCities: {
              q: "Which cities are supported?",
              a: "Support depends on local administration participation. More cities can be added over time.",
            },

            needAccount: {
              q: "Do I need an account to use CitizenVoice?",
              a: "You can browse community issues without an account. Reporting, liking, and commenting require login.",
            },
            createAccount: {
              q: "How do I create an account?",
              a: "Go to Signup, enter your details, and confirm. After that you can log in and start reporting issues.",
            },
            changePersonalId: {
              q: "Can I change my Personal ID?",
              a: "No. For security reasons, Personal ID cannot be changed after account creation.",
            },
            forgotPassword: {
              q: "What if I forget my password?",
              a: "Currently, password reset is handled by contacting support. A self-service reset feature can be added later.",
            },
            logout: {
              q: "How do I log out?",
              a: "Open Profile or Settings and click Logout to end your session on this device.",
            },

            howToReport: {
              q: "How do I report an issue?",
              a: "Log in as a citizen, go to Report, fill the form (title, category, city, description), optionally add a photo, then submit.",
            },
            whatIssues: {
              q: "What types of issues can I report?",
              a: "Examples: road damage, water supply problems, street lighting, waste management, public safety concerns, and more.",
            },
            addPhoto: {
              q: "Can I add photos to my report?",
              a: "Yes. Photos help admins understand the issue faster and verify the location and severity.",
            },
            editReport: {
              q: "Can I edit a report after submitting?",
              a: "Currently, reports cannot be edited after submission. If you need changes, contact support or create a new report with correct details.",
            },
            deleteReport: {
              q: "Can I delete a report?",
              a: "No. Reports are kept for transparency and auditing. Admins can reject invalid or duplicate reports.",
            },

            statusMeaning: {
              q: "What do report statuses mean?",
              a: "Pending: waiting for review. In Progress: being handled. Resolved: fixed. Rejected: invalid, duplicate, or not actionable.",
            },
            trackMyReports: {
              q: "How do I track my reports?",
              a: "Go to My Reports. You’ll see all submitted reports and their current status.",
            },
            notifyStatusChanges: {
              q: "Will I be notified when status changes?",
              a: "You’ll see updates in-app. Email notifications can be enabled later when backend notifications are connected.",
            },

            seeOtherReports: {
              q: "Can I see reports from other users?",
              a: "Yes, the Community page shows issues reported by other citizens (based on filters you choose).",
            },
            likeComment: {
              q: "Can I like or comment on reports?",
              a: "Yes, but only when logged in. Guest users can browse but cannot interact.",
            },
            whyNoGuestLike: {
              q: "Why can’t guests like or comment?",
              a: "To prevent spam and ensure accountability. Interactions are tied to user accounts.",
            },

            whoManagesReports: {
              q: "Who manages reports?",
              a: "Admins review reports, update statuses, add notes, and manage users.",
            },
            adminAnalytics: {
              q: "What is Admin Analytics?",
              a: "Admins can view stats like reports per city, category, status distribution, and monthly trend.",
            },

            profileCompletion: {
              q: "What is Profile Completion?",
              a: "It shows how complete your profile is. Adding phone, city, and a photo increases it.",
            },
            whyCompleteProfile: {
              q: "Why should I complete my profile?",
              a: "A complete profile helps admins contact you if they need clarification to resolve an issue faster.",
            },
            changeEmail: {
              q: "Can I change my email or phone?",
              a: "Yes. Use Change Credentials to update your account details.",
            },

            dataSafety: {
              q: "Is my personal data safe?",
              a: "CitizenVoice uses authentication and role-based access. Only admins can access what they need for issue resolution.",
            },
            anonymousReport: {
              q: "Are my reports anonymous?",
              a: "Other citizens do not see your personal details. Admins may see limited details to contact you if needed.",
            },

            supportedDevices: {
              q: "Which devices are supported?",
              a: "CitizenVoice works on desktop, tablet, and mobile browsers.",
            },
            pageNotLoading: {
              q: "Why is a page not loading?",
              a: "Check your internet connection, refresh the page, and make sure you are logged in if the page requires authentication.",
            },
            contactSupport: {
              q: "How can I contact support?",
              a: "Use the Contact page to send a message. Provide your Personal ID and details about the issue.",
            },

            mobileApp: {
              q: "Will there be a mobile app?",
              a: "A mobile app can be added in future releases. The current web app already works on mobile browsers.",
            },
            emailNotifications: {
              q: "Will I get email notifications?",
              a: "Email notifications are planned. The Settings page can later be connected to backend preferences.",
            },
          },
        },
      },

      // ✅ COMPLETE Settings keys used by Settings.jsx
      settings: {
        delete: {
          title: "Delete Account",
          hint: "This permanently deletes your account and your data. This action cannot be undone.",
          button: "Delete Account",
          passwordPrompt: "Enter your password to confirm account deletion",
          confirmText: "Are you sure you want to delete your account? Type delete to confirm.",
        },
        title: "Settings",
        appearance: "Appearance",
        language: "Language",
        theme: "Theme",
        density: "Density",
        notifications: "Notifications",
        privacy: "Privacy",
        security: "Security",
        changeCredentials: "Change Credentials",
        exportSettings: "Export settings",
        resetPreferences: "Reset preferences",
        resetDone: "✅ Preferences reset (account kept logged in).",

        account: "Account",
        session: "Session",
        sessionHint: "If you suspect your account is open elsewhere, logout.",

        themeHint: "Choose how CitizenVoice looks on this device.",
        densityHint: "Compact mode fits more content on the screen.",
        languageHint: "This changes the UI language across the app.",

        themeSystem: "System",
        themeLight: "Light",
        themeDark: "Dark",

        densityComfortable: "Comfortable",
        densityCompact: "Compact",

        notificationsHint:
          "These are saved locally for now (you can connect to backend later).",

        notif: {
          inApp: "In-app notifications",
          inAppHint: "Show alerts inside the app.",
          email: "Email notifications",
          emailHint: "Receive important updates by email.",
          reportUpdates: "Report status updates",
          reportUpdatesHint: "Notify when your report changes status.",
          communityDigest: "Community weekly digest",
          communityDigestHint: "Summary of top issues in your area.",
          adminAlerts: "Admin alerts",
          adminAlertsHint: "New reports, escalations, system warnings.",
        },

        access: {
          reduceMotion: "Reduce motion",
          reduceMotionHint: "Less animations for better comfort.",
          highContrast: "High contrast",
          highContrastHint: "Improve readability with stronger contrast.",
        },

        tipsFooter:
          "Tip: Later you can sync these preferences to the database so users keep settings across devices.",
      },

      profile: {
        title: "My Profile",
        uploadPhoto: "Upload photo",
        fullName: "Full name",
        phone: "Phone",
        city: "City",
        save: "Save changes",
        saving: "Saving...",
        logout: "Logout",
        email: "Email",
        personalId: "Personal ID",
        active: "Active",
        tabs: {
          overview: "Overview",
          edit: "Edit profile",
          security: "Security",
        },
        hints: {
          photo: "JPG/PNG, recommended square image.",
          edit: "These fields update your public profile information.",
          security: "Manage your account security. Personal ID cannot be changed.",
          emailCopyOk: "✅ Copied",
          emailCopyFail: "Copy failed",
          noPhoto: "No Photo",
        },
      },

      creds: {
        changePasswordTitle: "Change Password",
        currentPasswordPlaceholder: "Current Password",
        newPasswordPlaceholder: "New Password",
        title: "Change Credentials",
        subtitle: "Update your account details (Personal ID cannot be changed).",
        email: "Email",
        fullName: "Full name",
        phone: "Phone",
        city: "City",
        currentPassword: "Current password",
        newPassword: "New password",
        confirmNewPassword: "Confirm Password",
        save: "Save changes",
        alerts: { updated: "✅ Credentials updated" },
        errors: {
          loadFail: "Failed to load user",
          updateFail: "Failed to update credentials",
        },
      },
    },
  },

  it: {
    translation: {
      languages: {
        en: "English",
        it: "Italiano",
        de: "Deutsch",
        es: "Español",
        sq: "Shqip",
      },

      adminUsers: {
        title: "Utenti",
        searchPlaceholder: "Cerca nome/email/ID personale",
        noResults: "Nessun utente trovato.",

        filters: {
          allRoles: "Tutti i ruoli",
          all: "Tutti",
          active: "Attivo",
          suspended: "Sospeso",
        },

        table: {
          name: "Nome",
          personalId: "ID personale",
          email: "Email",
          role: "Ruolo",
          active: "Attivo",
          actions: "Azioni",
        },

        actions: {
          apply: "Applica",
          make: "Rendi",
          suspend: "Sospendi",
          activate: "Attiva",
        },

        errors: {
          loadFail: "Impossibile caricare gli utenti",
          roleFail: "Impossibile aggiornare il ruolo",
          statusFail: "Impossibile aggiornare lo stato",
        },
      },


      report: {
        title: "Segnala un problema",
        subtitle: "Fornisci i dettagli del problema.",

        tips: {
          clearTitle: "Usa un titolo chiaro",
          addLocation: "Aggiungi la posizione se possibile",
          photoHelps: "Una foto aiuta a risolvere più velocemente",
        },

        sections: {
          details: "Dettagli del problema",
          detailsSub: "Descrivi cosa è successo e dove.",
        },

        fields: {
          issueTitle: "Titolo del problema",
          category: "Categoria",
          city: "Città / Comune",
          description: "Descrizione",
          photo: "Carica immagine (opzionale)",
          map: "Posizione sulla mappa (opzionale)",
        },

        placeholders: {
          issueTitle: "Breve descrizione del problema",
          city: "Inserisci città o comune",
          description: "Descrivi il problema in dettaglio...",
        },

        hints: {
          title: "Esempio: “Buche su Via Centrale.”",
          description: "Indica cosa hai visto e da quanto tempo.",
          map: "Clicca sulla mappa per impostare la posizione.",
          noLocation: "Nessuna posizione selezionata. (Puoi inviare anche senza posizione.)",
          submit: "Dopo l'invio puoi monitorare lo stato in “Le mie segnalazioni”.",
        },

        upload: {
          title: "Aggiungi una foto (opzionale)",
          subtitle: "JPG/PNG • max 5MB",
          button: "Scegli file",
        },

        actions: {
          submit: "Invia segnalazione",
          submitting: "Invio in corso...",
          reset: "Reimposta",
          useMyLocation: "Usa la mia posizione",
          clearMarker: "Cancella",
          noMarker: "Nessun marker impostato",
          removePhoto: "Rimuovi",
        },

        side: {
          title: "Cosa succede dopo?",
          step1: "La segnalazione viene salvata e mostrata agli admin.",
          step2: "Gli admin la revisionano e aggiornano lo stato.",
          step3: "Segui lo stato in “Le mie segnalazioni”.",
        },

        selected: "Selezionato",

        errors: {
          required: "Compila tutti i campi obbligatori.",
          titleShort: "Titolo troppo corto.",
          descShort: "Descrizione troppo corta.",
          loginRequired: "Devi effettuare l'accesso.",
          submitFail: "Invio fallito.",
          geoDenied: "Permesso posizione negato. Clicca sulla mappa.",
          geoNotSupported: "Geolocalizzazione non supportata.",
          imageOnly: "Carica solo immagini.",
          imageTooLarge: "Immagine troppo grande (max 5MB).",
        },
      },

      myReports: {
        title: "Le mie segnalazioni",
        subtitle: "Monitora lo stato delle segnalazioni inviate.",
        searchPlaceholder: "Cerca titolo o descrizione...",
        sortPrefix: "Ordina per",
        saveFilters: "Salva filtri",
        filtersSaved: "✅ Filtri salvati",
        noResults: "Nessuna segnalazione trovata.",
        errors: {
          loadFail: "Impossibile caricare le segnalazioni.",
        },
        labels: {
          status: "Stato",
          city: "Città",
          reportedAt: "Segnalato il",
        },
        issuePhotoAlt: "Foto del problema",

        // (kept from your original file — not used by MyReports.jsx but harmless)
        search: "Cerca titolo o descrizione...",
        loading: "Caricamento segnalazioni...",
        filters: {
          anyStatus: "Qualsiasi stato",
          pending: "In attesa",
          inProgress: "In corso",
          resolved: "Risolto",
          rejected: "Rifiutato",
          newest: "Più recenti",
          oldest: "Più vecchie",
          status: "Stato",
        },
        actions: {
          saveFilters: "Salva filtri",
          reset: "Reimposta",
          prev: "Precedente",
          next: "Successivo",
        },
      },

      nav: {
        report: "Segnala",
        myReports: "Le mie segnalazioni",
        community: "Community",
        helpCenter: "Centro assistenza",
        howItWorks: "Come funziona",
        faqs: "FAQ",
        contact: "Contatti",
        login: "Accedi",
        profile: "Profilo",
        settings: "Impostazioni",
        logout: "Esci",
      },

      auth: {
        signupTitle: "Registrati",
        dontHaveAccount: "Non hai ancora un account?",
        createAccount: "Crea account",
        alreadyHaveAccount: "Hai già un account?",
        password: "Password",
        agreeText: "Confermo che i miei dati sono corretti",
        passwordMismatch: "Le password non corrispondono",
        mustConfirm: "Conferma la casella.",
        accountCreated: "Account creato",
        loginFailed: "Accesso non riuscito",
        signupFailed: "Registrazione non riuscita",
      },

      common: {
        in_progress: "In corso",
        loading: "Caricamento...",
        saving: "Salvataggio...",
        uploading: "Caricamento...",
        save: "Salva",
        cancel: "Annulla",
        reset: "Reimposta",
        searchPlaceholder: "Cerca...",
        anyStatus: "Qualsiasi stato",
        pending: "In attesa",
        inProgress: "In corso",
        resolved: "Risolto",
        rejected: "Rifiutato",
        sortNewest: "Più recenti",
        sortOldest: "Più vecchi",
        sortStatus: "Stato",
        prev: "Prec",
        next: "Succ",
        page: "Pagina",
        of: "di",
        perPage: "{{n}} per pagina",
        open: "Apri",
        copy: "Copia",
        yes: "Si",
        no: "No",
        signedInAs: "Accesso come",
        role: "Ruolo",
        active: "Attivo",
        memberSince: "Membro dal",
        profileCompletion: "Completezza profilo",
        improveProfileHint: "Aggiungi telefono/città/foto per migliorare il profilo.",
        accountOverview: "Riepilogo account",
        session: "Sessione",
        endSessionHint: "Termina questa sessione su questo dispositivo.",
        openBtn: "Apri",

        admin: "Admin",
        citizen: "Cittadino",
      },

      home: {
        title: "Benvenuto su CitizenVoice",
        subtitle:
          "Vedi i problemi della community. Accedi per segnalare e monitorare le tue segnalazioni.",
        continueGuest: "Continua come ospite",
      },

      citizenHome: {
        top: {
          notifications: "Notifiche",
          profile: "Profilo",
          settings: "Impostazioni",
        },
        cta: {
          start: "Inizia →",
          view: "Vedi →",
          explore: "Esplora →",
        },
        helpCenter: {
          title: "Centro assistenza",
          subtitle: "Guide + domande comuni",
          links: {
            how: "Come funziona",
            faqs: "FAQ",
            contact: "Contatta supporto",
            ask: "Fai una domanda",
          },
          tip: "Suggerimento: se non trovi una risposta nelle FAQ, usa “Fai una domanda”.",
        },
        resources: {
          title: "Risorse",
          subtitle: "Informazioni utili per i cittadini",
          tiles: {
            city: "Risorse cittadine",
            citySub: "Servizi e contatti",
            feed: "Feed della community",
            feedSub: "Guarda cosa succede",
            track: "Monitora progressi",
            trackSub: "Stati e aggiornamenti",
            newReport: "Nuova segnalazione",
            newReportSub: "Crea una segnalazione velocemente",
          },
        },
        alerts: {
          seeAll: "Vedi tutto →",
          title: "Avvisi della community",
          water: "Manutenzione dell’acqua venerdì (8:00 - 17:00).",
          road: "Lavori stradali in Via Centrale — traffico rallentato.",
        },
        footer: {
          title: "Vuoi aiuto più veloce?",
          subtitle: "Controlla prima le FAQ o contatta il supporto se è urgente.",
          faqs: "FAQ",
          contact: "Contatti",
        },

        welcome: "Benvenuto su CitizenVoice",
        subtitle:
          "La tua comunità conta. Segnala problemi, monitora i progressi e resta informato.",
        actions: {
          report: {
            title: "Segnala un problema",
            desc: "Invia una nuova segnalazione per il tuo quartiere.",
          },
          myReports: {
            title: "Le mie segnalazioni",
            desc: "Visualizza lo stato delle segnalazioni inviate.",
          },
          community: {
            title: "Problemi della community",
            desc: "Vedi i problemi segnalati da altri cittadini.",
          },
        },
      },

      contact: {
        title: "Contatti",
        subtitle: "Inviaci un messaggio e ti risponderemo presto.",
        fields: {
          email: "Email",
          phone: "Numero di telefono",
          topic: "Oggetto",
          description: "Descrizione",
        },
        placeholders: {
          email: "esempio@email.com",
          topic: "Oggetto",
          description: "Scrivi il tuo messaggio...",
          phone: "Numero di telefono",
        },
        submit: "Invia",
        sending: "Invio...",
        success: "✅ Messaggio inviato con successo!",
      },

      community: {
        title: "Segnalazioni della Community",
        subtitle: "Problemi segnalati dai cittadini nella tua community.",
        guestNotice:
          "Stai navigando come ospite. Accedi per segnalare, mettere like o commentare.",
        searchPlaceholder: "Cerca titolo/descrizione...",
        cityPlaceholder: "Città",
        categoryPlaceholder: "Categoria",
        sortPrefix: "Ordina:",
        saveFilters: "Salva filtri",
        filtersSaved: "✅ Filtri salvati",
        loginToInteract: "Accedi per interagire →",
        loading: "Caricamento segnalazioni...",
        noResults: "Nessuna segnalazione trovata.",
        viewDetails: "Vedi dettagli →",
        like: "🤍 Mi piace",
        liked: "❤️ Piaciuto",
        loginRequiredLike: "Devi accedere per mettere like.",
        loginRequiredComment: "Devi accedere per commentare.",
        loginRequiredTooltip: "Accesso richiesto",
        issuePhotoAlt: "problema",
        comments: "Commenti",
        loadComments: "Carica commenti",
        hideComments: "Nascondi commenti",
        loginToComment: "Accedi per commentare",
        loginToCommentPlaceholder: "Accedi per commentare...",
        writeComment: "Scrivi un commento...",
        post: "Pubblica",
        moreComments: "+{{n}} altri commenti",
        noCommentsYet: "Ancora nessun commento.",
        perPage: "{{n}} / pagina",
        labels: {
          category: "Categoria",
          city: "Città",
          status: "Stato",
          reportedAt: "Segnalato il",
        },
      },

      profilePro: {
        title: "Il mio profilo",
        signedInAs: "Accesso come",
        tabs: {
          overview: "Panoramica",
          edit: "Modifica profilo",
          security: "Sicurezza",
        },
        photoHint: "JPG/PNG, consigliata un'immagine quadrata.",
        memberSince: "Membro dal",
        accountOverview: {
          title: "Riepilogo account",
        },
        role: "Ruolo",
        completion: {
          title: "Completezza profilo",
          hint: "Aggiungi telefono/città/foto per migliorare il profilo.",
        },
        actions: {
          editProfile: "Modifica profilo",
        },
      },

      admin: {
        brand: "CitizenVoice Admin",
        roleTag: "ADMIN",
        nav: {
          dashboard: "Dashboard",
          reports: "Segnalazioni",
          analytics: "Analisi",
          users: "Utenti",
          auditLog: "Registro audit",
          notifications: "Notifiche",
        },
        reports: {
          all: "Tutte",
        },
        analytics: {
          title: "Analisi",
          loginRequired: "Accesso richiesto (token mancante).",
          invalidResponse: "Il server ha restituito una risposta non valida.",
          cards: {
            total: "Totale segnalazioni",
          },
          statusBreakdown: "Distribuzione per stato",
          topCities: "Città principali",
          byCategory: "Segnalazioni per categoria",
          monthlyTrend: "Andamento mensile",
        },
      },

      adminHome: {
        contacts: {
          title: "Messaggi di contatto",
          empty: "Nessun messaggio di contatto.",

          cols: {
            email: "Email",
            phone: "Telefono",
            topic: "Oggetto",
            message: "Messaggio",
            date: "Data",
            status: "Stato",
          },

          status: {
            new: "Nuovo",
            read: "Letto",
            archived: "Archiviato",
          },
        },
        welcome: "Benvenuto su CitizenVoice",
        title: "Dashboard Admin",
        subtitle: "Gestisci segnalazioni, cittadini e dati della community.",
        cards: { totalReports: "Totale segnalazioni" },
        recent: {
          title: "Segnalazioni recenti",
          cols: { issue: "Problema", citizen: "Cittadino", status: "Stato", date: "Data" },
          empty: "Nessuna segnalazione trovata",
        },
        alerts: {
          title: "Avvisi e notifiche",
          highVolume: "Alto volume di nuove segnalazioni oggi.",
          maintenance: "Manutenzione di sistema programmata per venerdì.",
        },
      },

      errors: {
        failedToLoadCommunity: "Impossibile caricare le segnalazioni",
        failedToLoadComments: "Impossibile caricare i commenti",
        likeFailed: "Impossibile aggiornare il like",
        commentFailed: "Impossibile pubblicare il commento",
      },

      help: {
        how: {
          title: "Come funziona",
          subtitle:
            "CitizenVoice aiuta i cittadini a segnalare problemi, monitorare i progressi e restare informati.",

          // CTA buttons (top + footer)
          ctaFaq: "Vedi FAQ",
          ctaContact: "Contatti",

          // Steps grid (1–6)
          steps: {
            guest: {
              title: "Naviga come ospite",
              desc:
                "Puoi vedere i problemi della community senza accedere. I filtri ti aiutano a trovare segnalazioni per città, categoria e stato.",
            },
            account: {
              title: "Crea un account",
              desc:
                "Registrati come cittadino per inviare segnalazioni e interagire con la community.",
            },
            report: {
              title: "Segnala un problema",
              desc:
                "Aggiungi titolo, categoria, città e descrizione. Le foto aiutano gli admin a risolvere più velocemente.",
            },
            track: {
              title: "Monitora i progressi",
              desc:
                "Usa “Le mie segnalazioni” per vedere gli aggiornamenti: In attesa → In corso → Risolto (o Rifiutato).",
            },
            admin: {
              title: "Gli admin gestiscono e aggiornano",
              desc:
                "Gli admin revisionano le segnalazioni, aggiornano lo stato e aggiungono note. Le analisi aiutano a identificare le aree critiche.",
            },
            informed: {
              title: "Resta informato",
              desc:
                "La pagina community mostra cosa è di tendenza. Notifiche e digest email possono essere aggiunte in seguito.",
            },
          },

          // Footer card
          footer: {
            title: "Hai bisogno di aiuto per un problema specifico?",
            desc:
              "Controlla le FAQ o contatta il supporto con i dettagli (incluso il tuo ID personale).",
          },
        },

        /* =========================
   ✅ IT (put inside: it.translation.help.faqs)
   ========================= */
        faqs: {
          title: "FAQ",
          subtitle: "Risposte rapide su segnalazioni, monitoraggio, account e supporto.",
          search: "Cerca domande...",
          clear: "Pulisci",
          noResultsTitle: "Nessun risultato",
          noResultsBody: "Prova parole chiave diverse.",
          openQuestion: "Apri domanda",
          categories: {
            general: "Generale",
            accountAccess: "Account e Accesso",
            reporting: "Segnalazioni",
            statusTracking: "Stato e Monitoraggio",
            community: "Community",
            admin: "Admin",
            profileSettings: "Profilo e Impostazioni",
            privacySecurity: "Privacy e Sicurezza",
            technical: "Tecnico",
            roadmap: "Roadmap",
          },
          items: {
            whatIsCitizenVoice: {
              q: "Cos’è CitizenVoice?",
              a: "CitizenVoice è una piattaforma che permette ai cittadini di segnalare problemi, monitorarne i progressi e restare informati su ciò che accade nella propria zona.",
            },
            whoCanUse: {
              q: "Chi può usare CitizenVoice?",
              a: "Chiunque può consultare le segnalazioni come ospite. Per inviare segnalazioni o interagire (like/commenti), devi creare un account ed effettuare l’accesso.",
            },
            isItFree: {
              q: "CitizenVoice è gratuito?",
              a: "Sì, CitizenVoice è gratuito per i cittadini.",
            },
            supportedCities: {
              q: "Quali città sono supportate?",
              a: "Il supporto dipende dalla partecipazione dell’amministrazione locale. Col tempo possono essere aggiunte altre città.",
            },

            needAccount: {
              q: "Serve un account per usare CitizenVoice?",
              a: "Puoi consultare i problemi della community senza account. Segnalare, mettere like e commentare richiede l’accesso.",
            },
            createAccount: {
              q: "Come creo un account?",
              a: "Vai su Registrati, inserisci i tuoi dati e conferma. Poi puoi accedere e iniziare a segnalare problemi.",
            },
            changePersonalId: {
              q: "Posso cambiare il mio ID personale?",
              a: "No. Per motivi di sicurezza, l’ID personale non può essere cambiato dopo la creazione dell’account.",
            },
            forgotPassword: {
              q: "E se dimentico la password?",
              a: "Al momento il reset password si gestisce contattando il supporto. In futuro si può aggiungere una funzione di reset automatico.",
            },
            logout: {
              q: "Come faccio a disconnettermi?",
              a: "Apri Profilo o Impostazioni e fai clic su Esci per terminare la sessione su questo dispositivo.",
            },

            howToReport: {
              q: "Come segnalo un problema?",
              a: "Accedi come cittadino, vai su Segnala, compila il modulo (titolo, categoria, città, descrizione), opzionalmente aggiungi una foto, poi invia.",
            },
            whatIssues: {
              q: "Che tipo di problemi posso segnalare?",
              a: "Esempi: danni stradali, problemi idrici, illuminazione pubblica, gestione rifiuti, sicurezza pubblica e altro.",
            },
            addPhoto: {
              q: "Posso aggiungere foto alla segnalazione?",
              a: "Sì. Le foto aiutano gli admin a capire più velocemente il problema e a verificare posizione e gravità.",
            },
            editReport: {
              q: "Posso modificare una segnalazione dopo l’invio?",
              a: "Al momento non è possibile modificare una segnalazione dopo l’invio. Se servono modifiche, contatta il supporto o crea una nuova segnalazione con i dettagli corretti.",
            },
            deleteReport: {
              q: "Posso eliminare una segnalazione?",
              a: "No. Le segnalazioni vengono conservate per trasparenza e audit. Gli admin possono rifiutare segnalazioni non valide o duplicate.",
            },

            statusMeaning: {
              q: "Cosa significano gli stati delle segnalazioni?",
              a: "In attesa: in coda per la revisione. In corso: in lavorazione. Risolto: sistemato. Rifiutato: non valido, duplicato o non gestibile.",
            },
            trackMyReports: {
              q: "Come monitoro le mie segnalazioni?",
              a: "Vai su Le mie segnalazioni. Vedrai tutte le segnalazioni inviate e il loro stato attuale.",
            },
            notifyStatusChanges: {
              q: "Riceverò notifiche quando lo stato cambia?",
              a: "Vedrai gli aggiornamenti nell’app. Le notifiche email potranno essere abilitate più avanti quando saranno collegate al backend.",
            },

            seeOtherReports: {
              q: "Posso vedere le segnalazioni di altri utenti?",
              a: "Sì, la pagina Community mostra i problemi segnalati da altri cittadini (in base ai filtri scelti).",
            },
            likeComment: {
              q: "Posso mettere like o commentare le segnalazioni?",
              a: "Sì, ma solo dopo aver effettuare l’accesso. Gli ospiti possono consultare ma non interagire.",
            },
            whyNoGuestLike: {
              q: "Perché gli ospiti non possono mettere like o commentare?",
              a: "Per prevenire spam e garantire responsabilità. Le interazioni sono legate agli account utente.",
            },

            whoManagesReports: {
              q: "Chi gestisce le segnalazioni?",
              a: "Gli admin revisionano le segnalazioni, aggiornano gli stati, aggiungono note e gestiscono gli utenti.",
            },
            adminAnalytics: {
              q: "Cos’è l’Analisi Admin?",
              a: "Gli admin possono vedere statistiche come segnalazioni per città, categoria, distribuzione per stato e andamento mensile.",
            },

            profileCompletion: {
              q: "Cos’è la Completezza del profilo?",
              a: "Indica quanto è completo il tuo profilo. Aggiungere telefono, città e una foto aumenta la percentuale.",
            },
            whyCompleteProfile: {
              q: "Perché dovrei completare il profilo?",
              a: "Un profilo completo aiuta gli admin a contattarti se serve chiarire dei dettagli per risolvere più velocemente il problema.",
            },
            changeEmail: {
              q: "Posso cambiare email o telefono?",
              a: "Sì. Usa Modifica credenziali per aggiornare i dati del tuo account.",
            },

            dataSafety: {
              q: "I miei dati personali sono al sicuro?",
              a: "CitizenVoice usa autenticazione e accesso basato sui ruoli. Solo gli admin possono accedere a ciò che serve per risolvere i problemi.",
            },
            anonymousReport: {
              q: "Le mie segnalazioni sono anonime?",
              a: "Gli altri cittadini non vedono i tuoi dati personali. Gli admin possono vedere dettagli limitati per contattarti se necessario.",
            },

            supportedDevices: {
              q: "Quali dispositivi sono supportati?",
              a: "CitizenVoice funziona su browser desktop, tablet e mobile.",
            },
            pageNotLoading: {
              q: "Perché una pagina non si carica?",
              a: "Controlla la connessione internet, aggiorna la pagina e assicurati di essere loggato se la pagina richiede autenticazione.",
            },
            contactSupport: {
              q: "Come posso contattare il supporto?",
              a: "Usa la pagina Contatti per inviare un messaggio. Inserisci il tuo ID personale e i dettagli del problema.",
            },

            mobileApp: {
              q: "Ci sarà un’app mobile?",
              a: "Un’app mobile può essere aggiunta in versioni future. L’app web attuale funziona già sui browser mobile.",
            },
            emailNotifications: {
              q: "Riceverò notifiche email?",
              a: "Le notifiche email sono previste. La pagina Impostazioni potrà essere collegata in seguito alle preferenze del backend.",
            },
          },
        },

        howTitle: "Come funziona",
        faqsTitle: "FAQ",
        contactTitle: "Contatti",
      },

      settings: {
        delete: {
          title: "Elimina account",
          hint: "Questa azione elimina definitivamente il tuo account e i tuoi dati. Non può essere annullata.",
          button: "Elimina account",
          passwordPrompt: "Inserisci la tua password per confermare l'eliminazione dell'account",
          confirmText: "Sei sicuro di voler eliminare il tuo account?",
        },
        title: "Impostazioni",
        appearance: "Aspetto",
        language: "Lingua",
        theme: "Tema",
        density: "Densità",
        notifications: "Notifiche",
        privacy: "Privacy",
        security: "Sicurezza",
        changeCredentials: "Modifica credenziali",
        exportSettings: "Esporta impostazioni",
        resetPreferences: "Reimposta preferenze",
        resetDone: "✅ Preferenze reimpostate (account rimasto connesso).",

        account: "Account",
        session: "Sessione",
        sessionHint: "Se pensi che l’account sia aperto altrove, esci.",

        themeHint: "Scegli come appare CitizenVoice su questo dispositivo.",
        densityHint: "La modalità compatta mostra più contenuti sullo schermo.",
        languageHint: "Questo cambia la lingua dell’interfaccia in tutta l’app.",

        themeSystem: "Sistema",
        themeLight: "Chiaro",
        themeDark: "Scuro",

        densityComfortable: "Confortevole",
        densityCompact: "Compatta",

        notificationsHint:
          "Per ora sono salvate localmente (puoi collegarle al backend più avanti).",

        notif: {
          inApp: "Notifiche in-app",
          inAppHint: "Mostra avvisi all’interno dell’app.",
          email: "Notifiche email",
          emailHint: "Ricevi aggiornamenti importanti via email.",
          reportUpdates: "Aggiornamenti sullo stato dei report",
          reportUpdatesHint: "Notifica quando il tuo report cambia stato.",
          communityDigest: "Riepilogo settimanale della community",
          communityDigestHint: "Sintesi dei principali problemi nella tua zona.",
          adminAlerts: "Avvisi admin",
          adminAlertsHint: "Nuovi report, escalation, avvisi di sistema.",
        },

        access: {
          reduceMotion: "Riduci animazioni",
          reduceMotionHint: "Meno animazioni per maggiore comfort.",
          highContrast: "Alto contrasto",
          highContrastHint: "Migliora la leggibilità con un contrasto più forte.",
        },

        tipsFooter:
          "Suggerimento: più avanti puoi sincronizzare queste preferenze nel database per mantenerle su più dispositivi.",
      },

      profile: {
        title: "Il mio profilo",
        uploadPhoto: "Carica foto",
        fullName: "Nome completo",
        phone: "Telefono",
        city: "Città",
        save: "Salva modifiche",
        saving: "Salvataggio...",
        logout: "Esci",
        email: "Email",
        personalId: "ID personale",
        active: "Attivo",
        tabs: {
          overview: "Panoramica",
          edit: "Modifica profilo",
          security: "Sicurezza",
        },
        hints: {
          photo: "JPG/PNG, consigliata un'immagine quadrata.",
          edit: "Questi campi aggiornano le informazioni del tuo profilo.",
          security:
            "Gestisci la sicurezza dell’account. L’ID personale non può essere cambiato.",
          emailCopyOk: "✅ Copiato",
          emailCopyFail: "Copia non riuscita",
          noPhoto: "Nessuna foto",
        },
      },

      creds: {
        changePasswordTitle: "Cambia password",
        currentPasswordPlaceholder: "Password attuale",
        newPasswordPlaceholder: "Nuova password",
        title: "Modifica credenziali",
        subtitle:
          "Aggiorna i dati dell’account (l’ID personale non può essere cambiato).",
        email: "Email",
        fullName: "Nome completo",
        phone: "Telefono",
        city: "Città",
        currentPassword: "Password attuale",
        newPassword: "Nuova password",
        confirmNewPassword: "Conferma nuova password",
        save: "Salva modifiche",
      },
    },
  },

  de: {
    translation: {
      languages: {
        en: "English",
        it: "Italiano",
        de: "Deutsch",
        es: "Español",
        sq: "Shqip",
      },

      adminUsers: {
        title: "Benutzer",
        searchPlaceholder: "Name/E-Mail/Personen-ID suchen",
        noResults: "Keine Benutzer gefunden.",

        filters: {
          allRoles: "Alle Rollen",
          all: "Alle",
          active: "Aktiv",
          suspended: "Gesperrt",
        },

        table: {
          name: "Name",
          personalId: "Personen-ID",
          email: "E-Mail",
          role: "Rolle",
          active: "Aktiv",
          actions: "Aktionen",
        },

        actions: {
          apply: "Anwenden",
          make: "Machen zu",
          suspend: "Sperren",
          activate: "Aktivieren",
        },

        errors: {
          loadFail: "Benutzer konnten nicht geladen werden",
          roleFail: "Rolle konnte nicht aktualisiert werden",
          statusFail: "Status konnte nicht aktualisiert werden",
        },
      },


      myReports: {
        title: "Meine Meldungen",
        subtitle: "Verfolge und verwalte deine eingereichten Meldungen.",
        searchPlaceholder: "Meldungen suchen...",
        sortPrefix: "Sortieren nach",
        saveFilters: "Filter speichern",
        filtersSaved: "Filter erfolgreich gespeichert.",
        noResults: "Keine Meldungen gefunden.",
        errors: {
          loadFail: "Meldungen konnten nicht geladen werden.",
        },
        labels: {
          status: "Status",
          city: "Stadt",
          reportedAt: "Gemeldet am",
        },
        issuePhotoAlt: "Problemfoto",
      },

      report: {
        title: "Problem melden",
        subtitle: "Hilf, deine Stadt zu verbessern, indem du Probleme meldest.",

        tips: {
          clearTitle: "Verwende einen klaren Titel",
          addLocation: "Ort hinzufügen, wenn möglich",
          photoHelps: "Ein Foto hilft bei einer schnelleren Lösung",
        },

        sections: {
          details: "Problemdetails",
          detailsSub: "Beschreibe, was passiert ist und wo.",
        },

        fields: {
          issueTitle: "Problemtitel",
          category: "Kategorie",
          city: "Stadt",
          description: "Beschreibung",
          photo: "Foto",
          map: "Kartenposition (optional)",
        },

        placeholders: {
          issueTitle: "Kurzer und klarer Titel",
          city: "Stadt eingeben",
          description: "Beschreibe das Problem...",
        },

        hints: {
          title: "Beispiel: „Schlagloch nahe der Hauptstraße verursacht Stau.“",
          description: "Beschreibe, was du gesehen hast, Dauer und Sicherheitsrisiken.",
          submit: "Nach dem Absenden kannst du den Fortschritt in „Meine Meldungen“ verfolgen.",
          map: "Klicke auf die Karte, um den Ort zu markieren.",
          noLocation: "Kein Ort ausgewählt. Du kannst auch ohne Ort absenden.",
        },

        actions: {
          useMyLocation: "Meinen Standort verwenden",
          reset: "Zurücksetzen",
          submit: "Meldung senden",
          submitting: "Wird gesendet...",
          removePhoto: "Entfernen",
          clearMarker: "Löschen",
          noMarker: "Kein Marker gesetzt",
        },

        upload: {
          title: "Foto hinzufügen (optional)",
          subtitle: "JPG/PNG • bis 5MB • hilft bei der Prüfung",
          button: "Datei wählen",
        },

        errors: {
          required: "Bitte alle Pflichtfelder ausfüllen.",
          titleShort: "Titel ist zu kurz.",
          descShort: "Beschreibung ist zu kurz.",
          imageOnly: "Bitte nur eine Bilddatei hochladen.",
          imageTooLarge: "Bild ist zu groß (max. 5MB).",
          geoNotSupported: "Geolokalisierung wird nicht unterstützt.",
          geoDenied: "Standortberechtigung verweigert.",
          loginRequired: "Du musst dich zuerst anmelden.",
          submitFail: "Meldung konnte nicht gesendet werden.",
        },

        selected: "Ausgewählt",

        side: {
          title: "Was passiert als Nächstes?",
          step1: "Deine Meldung wird gespeichert und den Admins angezeigt.",
          step2: "Admins prüfen und aktualisieren den Status.",
          step3: "Verfolge Änderungen in „Meine Meldungen“.",
        },
      },

      nav: {
        report: "Melden",
        myReports: "Meine Meldungen",
        community: "Community",
        helpCenter: "Hilfe-Center",
        howItWorks: "So funktioniert’s",
        faqs: "FAQs",
        contact: "Kontakt",
        login: "Anmelden",
        profile: "Profil",
        settings: "Einstellungen",
        logout: "Abmelden",
      },

      auth: {
        signupTitle: "Registrieren",
        dontHaveAccount: "Noch kein Konto?",
        createAccount: "Konto erstellen",
        alreadyHaveAccount: "Hast du schon ein Konto?",
        password: "Passwort",
        agreeText: "Ich bestätige, dass meine Angaben korrekt sind",
        passwordMismatch: "Passwörter stimmen nicht überein",
        mustConfirm: "Bitte Checkbox bestätigen.",
        accountCreated: "Konto erstellt",
        loginFailed: "Login fehlgeschlagen",
        signupFailed: "Registrierung fehlgeschlagen",
      },

      common: {
        in_progress: "In Bearbeitung",
        loading: "Lädt...",
        saving: "Speichern...",
        uploading: "Hochladen...",
        save: "Speichern",
        cancel: "Abbrechen",
        reset: "Zurücksetzen",
        searchPlaceholder: "Suchen...",
        anyStatus: "Beliebiger Status",
        pending: "Ausstehend",
        inProgress: "In Bearbeitung",
        resolved: "Gelöst",
        rejected: "Abgelehnt",
        sortNewest: "Neueste",
        sortOldest: "Älteste",
        sortStatus: "Status",
        prev: "Zurück",
        next: "Weiter",
        page: "Seite",
        of: "von",
        perPage: "{{n}} pro Seite",
        open: "Öffnen",
        copy: "Kopieren",
        yes: "Ja",
        no: "Nein",
        signedInAs: "Angemeldet als",
        role: "Rolle",
        active: "Aktiv",
        memberSince: "Mitglied seit",
        profileCompletion: "Profil-Vollständigkeit",
        improveProfileHint:
          "Füge Telefon/Stadt/Foto hinzu, um dein Profil zu verbessern.",
        accountOverview: "Kontoübersicht",
        session: "Sitzung",
        endSessionHint: "Beende diese Sitzung auf diesem Gerät.",
        openBtn: "Öffnen",

        admin: "Admin",
        citizen: "Bürger",
      },

      home: {
        title: "Willkommen bei CitizenVoice",
        subtitle:
          "Sieh Community-Probleme. Melde dich an, um zu berichten und deine Meldungen zu verfolgen.",
        continueGuest: "Als Gast fortfahren",
      },

      citizenHome: {
        top: {
          notifications: "Benachrichtigungen",
          profile: "Profil",
          settings: "Einstellungen",
        },
        cta: {
          start: "Start →",
          view: "Ansehen →",
          explore: "Entdecken →",
        },
        helpCenter: {
          title: "Hilfe-Center",
          subtitle: "Guides + häufige Fragen",
          links: {
            how: "So funktioniert’s",
            faqs: "FAQs",
            contact: "Support kontaktieren",
            ask: "Frage stellen",
          },
          tip: "Tipp: Wenn du in den FAQs keine Antwort findest, nutze „Frage stellen“.",
        },
        resources: {
          title: "Ressourcen",
          subtitle: "Nützliche Infos für Bürger",
          tiles: {
            city: "Stadtressourcen",
            citySub: "Dienste & Kontakte",
            feed: "Community-Feed",
            feedSub: "Was gerade passiert",
            track: "Fortschritt verfolgen",
            trackSub: "Status & Updates",
            newReport: "Neue Meldung",
            newReportSub: "Schnell eine Meldung erstellen",
          },
        },
        alerts: {
          seeAll: "Alle ansehen →",
          title: "Community-Warnungen",
          water: "Wartung der Wasserversorgung am Freitag (8:00–17:00).",
          road: "Straßenarbeiten in der Central Ave — langsamer Verkehr.",
        },
        footer: {
          title: "Schnellere Hilfe?",
          subtitle:
            "Sieh zuerst in die FAQs oder kontaktiere den Support, wenn es dringend ist.",
          faqs: "FAQs",
          contact: "Kontakt",
        },

        welcome: "Willkommen bei CitizenVoice",
        subtitle:
          "Deine Community zählt. Melde Probleme, verfolge Fortschritte und bleib informiert.",
        actions: {
          report: {
            title: "Problem melden",
            desc: "Reiche ein neues Problem für deine Nachbarschaft ein.",
          },
          myReports: {
            title: "Meine Meldungen",
            desc: "Sieh den Status deiner eingereichten Meldungen.",
          },
          community: {
            title: "Community-Probleme",
            desc: "Sieh Probleme, die von anderen Bürgern gemeldet wurden.",
          },
        },
      },

      contact: {
        title: "Kontakt",
        subtitle: "Senden Sie uns eine Nachricht, wir melden uns bei Ihnen.",
        fields: {
          email: "E-Mail",
          phone: "Telefonnummer",
          topic: "Thema",
          description: "Beschreibung",
        },
        placeholders: {
          email: "beispiel@email.com",
          topic: "Betreff",
          description: "Schreiben Sie Ihre Nachricht...",
          phone: "Telefonnummer",
        },
        submit: "Senden",
        sending: "Wird gesendet...",
        success: "✅ Nachricht erfolgreich gesendet!",
      },

      community: {
        title: "Community-Meldungen",
        subtitle: "Von Bürgern gemeldete Probleme in deiner Community.",
        guestNotice:
          "Du bist als Gast unterwegs. Melde dich an, um zu melden, zu liken oder zu kommentieren.",
        searchPlaceholder: "Titel/Beschreibung suchen...",
        cityPlaceholder: "Stadt",
        categoryPlaceholder: "Kategorie",
        sortPrefix: "Sortieren:",
        saveFilters: "Filter speichern",
        filtersSaved: "✅ Filter gespeichert",
        loginToInteract: "Anmelden, um zu interagieren →",
        loading: "Community-Meldungen werden geladen...",
        noResults: "Keine Meldungen gefunden.",
        viewDetails: "Details ansehen →",
        like: "🤍 Like",
        liked: "❤️ Geliked",
        loginRequiredLike: "Zum Liken ist eine Anmeldung erforderlich.",
        loginRequiredComment: "Zum Kommentieren ist eine Anmeldung erforderlich.",
        loginRequiredTooltip: "Anmeldung erforderlich",
        issuePhotoAlt: "problem",
        comments: "Kommentare",
        loadComments: "Kommentare laden",
        hideComments: "Kommentare ausblenden",
        loginToComment: "Zum Kommentieren anmelden",
        loginToCommentPlaceholder: "Zum Kommentieren anmelden...",
        writeComment: "Kommentar schreiben...",
        post: "Posten",
        moreComments: "+{{n}} weitere Kommentare",
        noCommentsYet: "Noch keine Kommentare.",
        perPage: "{{n}} / Seite",
        labels: {
          category: "Kategorie",
          city: "Stadt",
          status: "Status",
          reportedAt: "Gemeldet am",
        },
      },

      profilePro: {
        title: "Mein Profil",
        signedInAs: "Angemeldet als",
        tabs: {
          overview: "Übersicht",
          edit: "Profil bearbeiten",
          security: "Sicherheit",
        },
        photoHint: "JPG/PNG, quadratisches Bild empfohlen.",
        memberSince: "Mitglied seit",
        accountOverview: {
          title: "Kontoübersicht",
        },
        role: "Rolle",
        completion: {
          title: "Profil-Vollständigkeit",
          hint: "Füge Telefon/Stadt/Foto hinzu, um dein Profil zu verbessern.",
        },
        actions: {
          editProfile: "Profil bearbeiten",
        },
      },

      admin: {
        brand: "CitizenVoice Admin",
        roleTag: "ADMIN",
        nav: {
          dashboard: "Dashboard",
          reports: "Meldungen",
          analytics: "Analysen",
          users: "Benutzer",
          auditLog: "Audit-Protokoll",
          notifications: "Benachrichtigungen",
        },
        reports: {
          all: "Alle",
        },
        analytics: {
          title: "Analysen",
          loginRequired: "Anmeldung erforderlich (Token fehlt).",
          invalidResponse: "Server hat eine ungültige Antwort zurückgegeben.",
          cards: {
            total: "Gesamtmeldungen",
          },
          statusBreakdown: "Statusübersicht",
          topCities: "Top-Städte",
          byCategory: "Meldungen nach Kategorie",
          monthlyTrend: "Monatlicher Verlauf",
        },
      },

      adminHome: {
        contacts: {
          title: "Kontaktanfragen",
          empty: "Noch keine Kontaktanfragen.",

          cols: {
            email: "E-Mail",
            phone: "Telefon",
            topic: "Thema",
            message: "Nachricht",
            date: "Datum",
            status: "Status",
          },

          status: {
            new: "Neu",
            read: "Gelesen",
            archived: "Archiviert",
          },
        },
        welcome: "Willkommen bei CitizenVoice",
        title: "Admin-Dashboard",
        subtitle: "Verwalte Meldungen, Bürger und Community-Daten.",
        cards: { totalReports: "Meldungen gesamt" },
        recent: {
          title: "Neueste Meldungen",
          cols: { issue: "Problem", citizen: "Bürger", status: "Status", date: "Datum" },
          empty: "Keine Meldungen gefunden",
        },
        alerts: {
          title: "Hinweise & Benachrichtigungen",
          highVolume: "Heute gibt es viele neue Meldungen.",
          maintenance: "Systemwartung ist für Freitag geplant.",
        },
      },

      errors: {
        failedToLoadCommunity: "Community-Meldungen konnten nicht geladen werden",
        failedToLoadComments: "Kommentare konnten nicht geladen werden",
        likeFailed: "Like konnte nicht aktualisiert werden",
        commentFailed: "Kommentar konnte nicht gepostet werden",
      },

      help: {
        how: {
          title: "So funktioniert es",
          subtitle:
            "CitizenVoice hilft Bürgern, Probleme zu melden, Fortschritte zu verfolgen und informiert zu bleiben.",

          ctaFaq: "FAQs ansehen",
          ctaContact: "Kontakt",

          steps: {
            guest: {
              title: "Als Gast browsen",
              desc:
                "Du kannst Community-Probleme ohne Anmeldung ansehen. Filter helfen dir, Meldungen nach Stadt, Kategorie und Status zu finden.",
            },
            account: {
              title: "Konto erstellen",
              desc:
                "Registriere dich als Bürger, um Probleme zu melden und mit der Community zu interagieren.",
            },
            report: {
              title: "Problem melden",
              desc:
                "Füge Titel, Kategorie, Stadt und Beschreibung hinzu. Fotos helfen Admins, schneller zu handeln.",
            },
            track: {
              title: "Fortschritt verfolgen",
              desc:
                "Nutze „Meine Meldungen“, um Statusupdates zu sehen: Ausstehend → In Bearbeitung → Gelöst (oder Abgelehnt).",
            },
            admin: {
              title: "Admins verwalten & aktualisieren",
              desc:
                "Admins prüfen Meldungen, aktualisieren den Status und fügen Notizen hinzu. Analysen zeigen Problemzonen.",
            },
            informed: {
              title: "Informiert bleiben",
              desc:
                "Die Community-Seite zeigt aktuelle Themen. Benachrichtigungen und E-Mail-Zusammenfassungen folgen später.",
            },
          },

          footer: {
            title: "Brauchst du Hilfe bei einem bestimmten Problem?",
            desc:
              "Sieh zuerst in die FAQs oder kontaktiere den Support mit Details (inkl. deiner persönlichen ID).",
          },
        },

        /* =========================
 ✅ DE (put inside: de.translation.help.faqs)
 ========================= */
        faqs: {
          title: "FAQs",
          subtitle: "Kurze Antworten zu Meldungen, Tracking, Konten und Support.",
          search: "Fragen suchen...",
          clear: "Löschen",
          noResultsTitle: "Keine Ergebnisse",
          noResultsBody: "Versuche andere Suchbegriffe.",
          openQuestion: "Frage öffnen",
          categories: {
            general: "Allgemein",
            accountAccess: "Konto & Zugriff",
            reporting: "Melden",
            statusTracking: "Status & Tracking",
            community: "Community",
            admin: "Admin",
            profileSettings: "Profil & Einstellungen",
            privacySecurity: "Datenschutz & Sicherheit",
            technical: "Technisch",
            roadmap: "Roadmap",
          },
          items: {
            whatIsCitizenVoice: {
              q: "Was ist CitizenVoice?",
              a: "CitizenVoice ist eine Plattform, mit der Bürger Community-Probleme melden, deren Fortschritt verfolgen und sich darüber informieren können, was in ihrer Umgebung passiert.",
            },
            whoCanUse: {
              q: "Wer kann CitizenVoice nutzen?",
              a: "Jeder kann Community-Meldungen als Gast ansehen. Um Meldungen einzureichen oder zu interagieren (Liken/Kommentieren), musst du ein Konto erstellen und dich anmelden.",
            },
            isItFree: {
              q: "Ist CitizenVoice kostenlos?",
              a: "Ja, CitizenVoice ist für Bürger kostenlos.",
            },
            supportedCities: {
              q: "Welche Städte werden unterstützt?",
              a: "Die Unterstützung hängt von der Beteiligung der lokalen Verwaltung ab. Mit der Zeit können weitere Städte hinzugefügt werden.",
            },

            needAccount: {
              q: "Brauche ich ein Konto, um CitizenVoice zu nutzen?",
              a: "Du kannst Community-Probleme ohne Konto ansehen. Melden, Liken und Kommentieren erfordert eine Anmeldung.",
            },
            createAccount: {
              q: "Wie erstelle ich ein Konto?",
              a: "Gehe zu Registrieren, gib deine Daten ein und bestätige. Danach kannst du dich anmelden und mit dem Melden beginnen.",
            },
            changePersonalId: {
              q: "Kann ich meine Persönliche ID ändern?",
              a: "Nein. Aus Sicherheitsgründen kann die Persönliche ID nach der Kontoerstellung nicht geändert werden.",
            },
            forgotPassword: {
              q: "Was, wenn ich mein Passwort vergesse?",
              a: "Derzeit wird ein Passwort-Reset über den Support abgewickelt. Eine Selbstbedienungs-Funktion kann später hinzugefügt werden.",
            },
            logout: {
              q: "Wie melde ich mich ab?",
              a: "Öffne Profil oder Einstellungen und klicke auf Abmelden, um deine Sitzung auf diesem Gerät zu beenden.",
            },

            howToReport: {
              q: "Wie melde ich ein Problem?",
              a: "Melde dich als Bürger an, gehe zu Melden, fülle das Formular aus (Titel, Kategorie, Stadt, Beschreibung), füge optional ein Foto hinzu und sende ab.",
            },
            whatIssues: {
              q: "Welche Arten von Problemen kann ich melden?",
              a: "Beispiele: Straßenschäden, Probleme mit der Wasserversorgung, Straßenbeleuchtung, Abfallentsorgung, öffentliche Sicherheit und mehr.",
            },
            addPhoto: {
              q: "Kann ich Fotos zu meiner Meldung hinzufügen?",
              a: "Ja. Fotos helfen Admins, das Problem schneller zu verstehen und Ort sowie Schweregrad zu prüfen.",
            },
            editReport: {
              q: "Kann ich eine Meldung nach dem Absenden bearbeiten?",
              a: "Derzeit können Meldungen nach dem Absenden nicht bearbeitet werden. Wenn Änderungen nötig sind, kontaktiere den Support oder erstelle eine neue Meldung mit korrekten Details.",
            },
            deleteReport: {
              q: "Kann ich eine Meldung löschen?",
              a: "Nein. Meldungen werden aus Transparenz- und Audit-Gründen aufbewahrt. Admins können ungültige oder doppelte Meldungen ablehnen.",
            },

            statusMeaning: {
              q: "Was bedeuten die Status einer Meldung?",
              a: "Ausstehend: wartet auf Prüfung. In Bearbeitung: wird bearbeitet. Gelöst: behoben. Abgelehnt: ungültig, doppelt oder nicht umsetzbar.",
            },
            trackMyReports: {
              q: "Wie verfolge ich meine Meldungen?",
              a: "Gehe zu Meine Meldungen. Dort siehst du alle eingereichten Meldungen und ihren aktuellen Status.",
            },
            notifyStatusChanges: {
              q: "Werde ich benachrichtigt, wenn sich der Status ändert?",
              a: "Du siehst Updates in der App. E-Mail-Benachrichtigungen können später aktiviert werden, wenn Backend-Benachrichtigungen verbunden sind.",
            },

            seeOtherReports: {
              q: "Kann ich Meldungen anderer Nutzer sehen?",
              a: "Ja, die Community-Seite zeigt Probleme, die von anderen Bürgern gemeldet wurden (basierend auf deinen Filtern).",
            },
            likeComment: {
              q: "Kann ich Meldungen liken oder kommentieren?",
              a: "Ja, aber nur wenn du angemeldet bist. Gäste können nur ansehen und nicht interagieren.",
            },
            whyNoGuestLike: {
              q: "Warum können Gäste nicht liken oder kommentieren?",
              a: "Um Spam zu verhindern und Verantwortlichkeit sicherzustellen. Interaktionen sind an Nutzerkonten gebunden.",
            },

            whoManagesReports: {
              q: "Wer verwaltet die Meldungen?",
              a: "Admins prüfen Meldungen, aktualisieren Status, fügen Notizen hinzu und verwalten Nutzer.",
            },
            adminAnalytics: {
              q: "Was ist Admin-Analytics?",
              a: "Admins können Statistiken sehen, z. B. Meldungen pro Stadt, Kategorie, Statusverteilung und monatliche Trends.",
            },

            profileCompletion: {
              q: "Was ist die Profil-Vollständigkeit?",
              a: "Sie zeigt, wie vollständig dein Profil ist. Das Hinzufügen von Telefon, Stadt und Foto erhöht sie.",
            },
            whyCompleteProfile: {
              q: "Warum sollte ich mein Profil vervollständigen?",
              a: "Ein vollständiges Profil hilft Admins, dich bei Rückfragen zu kontaktieren, um ein Problem schneller zu lösen.",
            },
            changeEmail: {
              q: "Kann ich meine E-Mail oder Telefonnummer ändern?",
              a: "Ja. Nutze Zugangsdaten ändern, um deine Kontodaten zu aktualisieren.",
            },

            dataSafety: {
              q: "Sind meine persönlichen Daten sicher?",
              a: "CitizenVoice nutzt Authentifizierung und rollenbasierten Zugriff. Nur Admins können auf das zugreifen, was zur Problemlösung nötig ist.",
            },
            anonymousReport: {
              q: "Sind meine Meldungen anonym?",
              a: "Andere Bürger sehen deine persönlichen Daten nicht. Admins können begrenzte Details sehen, um dich bei Bedarf zu kontaktieren.",
            },

            supportedDevices: {
              q: "Welche Geräte werden unterstützt?",
              a: "CitizenVoice funktioniert in Desktop-, Tablet- und Mobile-Browsern.",
            },
            pageNotLoading: {
              q: "Warum lädt eine Seite nicht?",
              a: "Prüfe deine Internetverbindung, aktualisiere die Seite und stelle sicher, dass du angemeldet bist, wenn die Seite Authentifizierung erfordert.",
            },
            contactSupport: {
              q: "Wie kann ich den Support kontaktieren?",
              a: "Nutze die Kontakt-Seite, um eine Nachricht zu senden. Gib deine Persönliche ID und Details zum Problem an.",
            },

            mobileApp: {
              q: "Wird es eine mobile App geben?",
              a: "Eine mobile App kann in zukünftigen Versionen hinzugefügt werden. Die aktuelle Web-App funktioniert bereits in mobilen Browsern.",
            },
            emailNotifications: {
              q: "Bekomme ich E-Mail-Benachrichtigungen?",
              a: "E-Mail-Benachrichtigungen sind geplant. Die Einstellungsseite kann später mit Backend-Präferenzen verbunden werden.",
            },
          },
        },

        howTitle: "So funktioniert’s",
        faqsTitle: "FAQs",
        contactTitle: "Kontakt",
      },

      settings: {
        delete: {
          passwordPrompt: "Geben Sie Ihr Passwort ein, um die Kontolöschung zu bestätigen",
          title: "Konto löschen",
          hint: "Dies löscht Ihr Konto und Ihre Daten dauerhaft. Diese Aktion kann nicht rückgängig gemacht werden.",
          button: "Konto löschen",
          confirmText: "Sind Sie sicher, dass Sie Ihr Konto löschen möchten?",

        },
        title: "Einstellungen",
        appearance: "Darstellung",
        language: "Sprache",
        theme: "Design",
        density: "Dichte",
        notifications: "Benachrichtigungen",
        privacy: "Datenschutz",
        security: "Sicherheit",
        changeCredentials: "Zugangsdaten ändern",
        exportSettings: "Einstellungen exportieren",
        resetPreferences: "Einstellungen zurücksetzen",
        resetDone: "✅ Einstellungen zurückgesetzt (Account bleibt angemeldet).",

        account: "Konto",
        session: "Sitzung",
        sessionHint:
          "Wenn du vermutest, dass dein Konto woanders offen ist, melde dich ab.",

        themeHint: "Wähle, wie CitizenVoice auf diesem Gerät aussieht.",
        densityHint: "Im kompakten Modus passt mehr Inhalt auf den Bildschirm.",
        languageHint: "Ändert die UI-Sprache in der gesamten App.",

        themeSystem: "System",
        themeLight: "Hell",
        themeDark: "Dunkel",

        densityComfortable: "Komfortabel",
        densityCompact: "Kompakt",

        notificationsHint:
          "Vorerst lokal gespeichert (später kannst du es mit dem Backend verbinden).",

        notif: {
          inApp: "In-App-Benachrichtigungen",
          inAppHint: "Zeige Hinweise innerhalb der App.",
          email: "E-Mail-Benachrichtigungen",
          emailHint: "Erhalte wichtige Updates per E-Mail.",
          reportUpdates: "Status-Updates zu Meldungen",
          reportUpdatesHint:
            "Benachrichtigen, wenn sich der Status deiner Meldung ändert.",
          communityDigest: "Wöchentlicher Community-Überblick",
          communityDigestHint:
            "Zusammenfassung der wichtigsten Probleme in deiner Umgebung.",
          adminAlerts: "Admin-Warnungen",
          adminAlertsHint: "Neue Meldungen, Eskalationen, Systemwarnungen.",
        },

        access: {
          reduceMotion: "Bewegungen reduzieren",
          reduceMotionHint: "Weniger Animationen für mehr Komfort.",
          highContrast: "Hoher Kontrast",
          highContrastHint: "Bessere Lesbarkeit durch stärkeren Kontrast.",
        },

        tipsFooter:
          "Tipp: Später kannst du diese Einstellungen in der Datenbank speichern, damit sie auf allen Geräten gelten.",
      },

      profile: {
        title: "Mein Profil",
        uploadPhoto: "Foto hochladen",
        fullName: "Vollständiger Name",
        phone: "Telefon",
        city: "Stadt",
        save: "Änderungen speichern",
        saving: "Speichern...",
        logout: "Abmelden",
        email: "E-Mail",
        personalId: "Persönliche ID",
        active: "Aktiv",
        tabs: {
          overview: "Übersicht",
          edit: "Profil bearbeiten",
          security: "Sicherheit",
        },
        hints: {
          photo: "JPG/PNG, quadratisches Bild empfohlen.",
          edit: "Diese Felder aktualisieren deine Profildaten.",
          security:
            "Verwalte die Kontosicherheit. Die persönliche ID kann nicht geändert werden.",
          emailCopyOk: "✅ Kopiert",
          emailCopyFail: "Kopieren fehlgeschlagen",
          noPhoto: "Kein Foto",
        },
      },

      creds: {
        changePasswordTitle: "Passwort ändern",
        currentPasswordPlaceholder: "Aktuelles Passwort",
        newPasswordPlaceholder: "Neues Passwort",
        title: "Zugangsdaten ändern",
        subtitle:
          "Kontodaten aktualisieren (Persönliche ID kann nicht geändert werden).",
        email: "E-Mail",
        fullName: "Vollständiger Name",
        phone: "Telefon",
        city: "Stadt",
        currentPassword: "Aktuelles Passwort",
        newPassword: "Neues Passwort",
        confirmNewPassword: "Neues Passwort bestätigen",
        save: "Änderungen speichern",
      },
    },
  },

  es: {
    translation: {
      languages: {
        en: "English",
        it: "Italiano",
        de: "Deutsch",
        es: "Español",
        sq: "Shqip",
      },

      adminUsers: {
        title: "Usuarios",
        searchPlaceholder: "Buscar nombre/email/ID personal",
        noResults: "No se encontraron usuarios.",

        filters: {
          allRoles: "Todos los roles",
          all: "Todos",
          active: "Activo",
          suspended: "Suspendido",
        },

        table: {
          name: "Nombre",
          personalId: "ID personal",
          email: "Email",
          role: "Rol",
          active: "Activo",
          actions: "Acciones",
        },

        actions: {
          apply: "Aplicar",
          make: "Hacer",
          suspend: "Suspender",
          activate: "Activar",
        },

        errors: {
          loadFail: "No se pudieron cargar los usuarios",
          roleFail: "No se pudo actualizar el rol",
          statusFail: "No se pudo actualizar el estado",
        },
      },


      nav: {
        report: "Reportar",
        myReports: "Mis reportes",
        community: "Comunidad",
        helpCenter: "Centro de ayuda",
        howItWorks: "Cómo funciona",
        faqs: "Preguntas",
        contact: "Contacto",
        login: "Iniciar sesión",
        profile: "Perfil",
        settings: "Ajustes",
        logout: "Cerrar sesión",
      },

      auth: {
        signupTitle: "Registrarse",
        dontHaveAccount: "¿Aún no tienes una cuenta?",
        createAccount: "Crear cuenta",
        alreadyHaveAccount: "¿Ya tienes una cuenta?",
        password: "Contraseña",
        agreeText: "Confirmo que mis datos son correctos",
        passwordMismatch: "Las contraseñas no coinciden",
        mustConfirm: "Confirma la casilla.",
        accountCreated: "Cuenta creada",
        loginFailed: "Error al iniciar sesión",
        signupFailed: "Error al registrarse",
      },

      // ✅ ADDED: full report keys used by Report.jsx (keeps your existing structure untouched)
      report: {
        title: "Reportar un problema",
        subtitle: "Ayuda a mejorar tu ciudad reportando problemas.",

        tips: {
          clearTitle: "Usa un título claro",
          addLocation: "Agrega ubicación si es posible",
          photoHelps: "Una foto ayuda a resolver más rápido",
        },

        sections: {
          details: "Detalles del problema",
          detailsSub: "Cuéntanos qué pasó y dónde.",
        },

        fields: {
          issueTitle: "Título del problema",
          category: "Categoría",
          city: "Ciudad",
          description: "Descripción",
          photo: "Foto",
          map: "Ubicación en el mapa (opcional)",
        },

        placeholders: {
          issueTitle: "Título corto y claro",
          city: "Ingresa la ciudad",
          description: "Describe el problema...",
        },

        hints: {
          title: "Ejemplo: “Bache cerca de Central Ave causando tráfico.”",
          description: "Incluye lo que viste, cuánto tiempo lleva y si es peligroso.",
          submit: "Después de enviar, puedes seguir el progreso en “Mis reportes”.",
          map: "Haz clic en el mapa para marcar la ubicación.",
          noLocation: "No hay ubicación seleccionada. Puedes enviar sin ubicación.",
        },

        actions: {
          useMyLocation: "Usar mi ubicación",
          reset: "Restablecer",
          submit: "Enviar reporte",
          submitting: "Enviando...",
          removePhoto: "Quitar",
          clearMarker: "Borrar",
          noMarker: "No hay marcador",
        },

        upload: {
          title: "Agregar una foto (opcional)",
          subtitle: "JPG/PNG • hasta 5MB • ayuda a verificar",
          button: "Elegir archivo",
        },

        errors: {
          required: "Completa todos los campos obligatorios.",
          titleShort: "El título es muy corto.",
          descShort: "La descripción es muy corta.",
          imageOnly: "Sube un archivo de imagen.",
          imageTooLarge: "La imagen es muy grande (máx 5MB).",
          geoNotSupported: "La geolocalización no está soportada.",
          geoDenied: "Permiso de ubicación denegado.",
          loginRequired: "Debes iniciar sesión primero.",
          submitFail: "No se pudo enviar el reporte.",
        },

        selected: "Seleccionado",

        side: {
          title: "¿Qué pasa después?",
          step1: "Tu reporte se guarda y se muestra a los admins.",
          step2: "Los admins revisan y actualizan el estado.",
          step3: "Sigue los cambios en “Mis reportes”.",
        },
      },

      common: {
        in_progress: "En progreso",
        loading: "Cargando...",
        saving: "Guardando...",
        uploading: "Subiendo...",
        save: "Guardar",
        cancel: "Cancelar",
        reset: "Restablecer",
        searchPlaceholder: "Buscar...",
        anyStatus: "Cualquier estado",
        pending: "Pendiente",
        inProgress: "En progreso",
        resolved: "Resuelto",
        rejected: "Rechazado",
        sortNewest: "Más nuevos",
        sortOldest: "Más antiguos",
        sortStatus: "Estado",
        prev: "Anterior",
        next: "Siguiente",
        page: "Página",
        of: "de",

        // ✅ ADDED: used by pagination (same pattern as other languages)
        perPage: "{{n}} por página",

        open: "Abrir",
        copy: "Copiar",
        yes: "Sí",
        no: "No",
        signedInAs: "Conectado como",
        role: "Rol",
        active: "Activo",
        memberSince: "Miembro desde",
        profileCompletion: "Completitud del perfil",
        improveProfileHint: "Agrega teléfono/ciudad/foto para mejorar tu perfil.",
        accountOverview: "Resumen de cuenta",
        session: "Sesión",
        endSessionHint: "Finaliza esta sesión en este dispositivo.",
        openBtn: "Abrir",

        admin: "Admin",
        citizen: "Ciudadano",
      },

      citizenHome: {
        top: {
          notifications: "Notificaciones",
          profile: "Perfil",
          settings: "Ajustes",
        },
        cta: {
          start: "Empezar →",
          view: "Ver →",
          explore: "Explorar →",
        },
        helpCenter: {
          title: "Centro de ayuda",
          subtitle: "Guías + preguntas comunes",
          links: {
            how: "Cómo funciona",
            faqs: "FAQs",
            contact: "Contactar soporte",
            ask: "Hacer una pregunta",
          },
          tip: "Consejo: si no encuentras respuesta en las FAQs, usa “Hacer una pregunta”.",
        },
        resources: {
          title: "Recursos",
          subtitle: "Información útil para ciudadanos",
          tiles: {
            city: "Recursos de la ciudad",
            citySub: "Servicios y contactos",
            feed: "Feed de comunidad",
            feedSub: "Mira qué está pasando",
            track: "Seguir progreso",
            trackSub: "Estados y actualizaciones",
            newReport: "Nuevo reporte",
            newReportSub: "Crea un reporte rápido",
          },
        },
        footer: {
          title: "¿Necesitas ayuda más rápida?",
          subtitle: "Revisa las FAQs primero o contacta soporte si es urgente.",
          faqs: "FAQs",
          contact: "Contacto",
        },
        alerts: {
          seeAll: "Ver todo →",
          title: "Alertas comunitarias",
          water: "Mantenimiento del suministro de agua el viernes (8:00–17:00).",
          road: "Reparaciones viales en Central Ave — tráfico lento.",
        },
      },

      contact: {
        title: "Contacto",
        subtitle: "Envíanos un mensaje y te responderemos.",
        fields: {
          email: "Correo electrónico",
          phone: "Número de teléfono",
          topic: "Asunto",
          description: "Descripción",
        },
        placeholders: {
          email: "ejemplo@email.com",
          topic: "Asunto",
          description: "Escribe tu mensaje...",
          phone: "Número de teléfono",
        },
        submit: "Enviar",
        sending: "Enviando...",
        success: "✅ ¡Mensaje enviado con éxito!",
      },

      home: {
        title: "Bienvenido a CitizenVoice",
        subtitle: "Ver problemas de la comunidad. Inicia sesión para reportar y seguir tus reportes.",
        continueGuest: "Continuar como invitado",
      },

      community: {
        title: "Reportes de la Comunidad",
        subtitle: "Problemas reportados por ciudadanos en tu comunidad.",
        guestNotice: "Estás navegando como invitado. Inicia sesión para reportar, dar like o comentar.",
        searchPlaceholder: "Buscar título/descripción...",
        cityPlaceholder: "Ciudad",
        categoryPlaceholder: "Categoría",
        sortPrefix: "Ordenar:",
        saveFilters: "Guardar filtros",
        filtersSaved: "✅ Filtros guardados",
        loginToInteract: "Inicia sesión para interactuar →",
        loading: "Cargando reportes...",
        noResults: "No se encontraron reportes.",
        viewDetails: "Ver detalles →",
        like: "🤍 Me gusta",
        liked: "❤️ Te gusta",
        loginRequiredLike: "Debes iniciar sesión para dar like.",
        loginRequiredComment: "Debes iniciar sesión para comentar.",
        loginRequiredTooltip: "Se requiere inicio de sesión",
        issuePhotoAlt: "problema",
        comments: "Comentarios",
        loadComments: "Cargar comentarios",
        hideComments: "Ocultar comentarios",
        loginToComment: "Inicia sesión para comentar",
        loginToCommentPlaceholder: "Inicia sesión para comentar...",
        writeComment: "Escribe un comentario...",
        post: "Publicar",
        moreComments: "+{{n}} comentarios más",
        noCommentsYet: "Aún no hay comentarios.",
        perPage: "{{n}} / página",
        labels: {
          category: "Categoría",
          city: "Ciudad",
          status: "Estado",
          reportedAt: "Reportado el",
        },
      },

      profilePro: {
        title: "Mi perfil",
        signedInAs: "Conectado como",
        tabs: {
          overview: "Resumen",
          edit: "Editar perfil",
          security: "Seguridad",
        },
        photoHint: "JPG/PNG, se recomienda una imagen cuadrada.",
        memberSince: "Miembro desde",
        accountOverview: {
          title: "Resumen de cuenta",
        },
        role: "Rol",
        completion: {
          title: "Completitud del perfil",
          hint: "Agrega teléfono/ciudad/foto para mejorar tu perfil.",
        },
        actions: {
          editProfile: "Editar perfil",
        },
      },

      admin: {
        brand: "CitizenVoice Admin",
        roleTag: "ADMIN",
        nav: {
          dashboard: "Panel",
          reports: "Reportes",
          analytics: "Analíticas",
          users: "Usuarios",
          auditLog: "Registro de auditoría",
          notifications: "Notificaciones",
        },
        reports: {
          all: "Todos",
        },
        analytics: {
          title: "Analíticas",
          loginRequired: "Inicio de sesión requerido (falta el token).",
          invalidResponse: "El servidor devolvió una respuesta inválida.",
          cards: {
            total: "Total de reportes",
          },
          statusBreakdown: "Distribución por estado",
          topCities: "Ciudades principales",
          byCategory: "Reportes por categoría",
          monthlyTrend: "Tendencia mensual",
        },
      },

      adminHome: {
        contacts: {
          title: "Mensajes de contacto",
          empty: "Aún no hay mensajes de contacto.",

          cols: {
            email: "Correo electrónico",
            phone: "Teléfono",
            topic: "Tema",
            message: "Mensaje",
            date: "Fecha",
            status: "Estado",
          },

          status: {
            new: "Nuevo",
            read: "Leído",
            archived: "Archivado",
          },
        },
        welcome: "Bienvenido a CitizenVoice",
        title: "Panel de Admin",
        subtitle: "Gestiona reportes, ciudadanos y datos de la comunidad.",
        cards: { totalReports: "Total de reportes" },
        recent: {
          title: "Reportes recientes",
          cols: { issue: "Problema", citizen: "Ciudadano", status: "Estado", date: "Fecha" },
          empty: "No se encontraron reportes",
        },
        alerts: {
          title: "Alertas y notificaciones",
          highVolume: "Hoy hay un alto volumen de nuevos reportes.",
          maintenance: "Mantenimiento del sistema programado para el viernes.",
        },
      },

      errors: {
        failedToLoadCommunity: "No se pudieron cargar los reportes",
        failedToLoadComments: "No se pudieron cargar los comentarios",
        likeFailed: "No se pudo actualizar el like",
        commentFailed: "No se pudo publicar el comentario",
      },

      // ✅ FIXED/EXPANDED: MyReports keys to match what MyReports.jsx calls
      myReports: {
        title: "Mis reportes",
        subtitle: "Sigue el estado de tus reportes enviados.",
        searchPlaceholder: "Buscar reportes...",
        sortPrefix: "Ordenar por",
        saveFilters: "Guardar filtros",
        filtersSaved: "Filtros guardados correctamente.",
        noResults: "No se encontraron reportes.",
        errors: {
          loadFail: "No se pudieron cargar los reportes.",
        },
        labels: {
          status: "Estado",
          city: "Ciudad",
          reportedAt: "Reportado el",
        },
        issuePhotoAlt: "Foto del problema",
      },

      help: {
        how: {
          title: "Cómo funciona",
          subtitle:
            "CitizenVoice ayuda a los ciudadanos a reportar problemas, seguir el progreso y mantenerse informados.",

          ctaFaq: "Ver preguntas frecuentes",
          ctaContact: "Contacto",

          steps: {
            guest: {
              title: "Navega como invitado",
              desc:
                "Puedes ver los problemas de la comunidad sin iniciar sesión. Los filtros te ayudan a encontrar reportes por ciudad, categoría y estado.",
            },
            account: {
              title: "Crea una cuenta",
              desc:
                "Regístrate como ciudadano para enviar reportes e interactuar con la comunidad.",
            },
            report: {
              title: "Reporta un problema",
              desc:
                "Añade título, categoría, ciudad y descripción. Las fotos ayudan a los administradores a resolver más rápido.",
            },
            track: {
              title: "Sigue el progreso",
              desc:
                "Usa “Mis reportes” para ver los estados: Pendiente → En progreso → Resuelto (o Rechazado).",
            },
            admin: {
              title: "Los administradores gestionan",
              desc:
                "Los administradores revisan reportes, actualizan estados y añaden notas. Las analíticas ayudan a detectar áreas críticas.",
            },
            informed: {
              title: "Mantente informado",
              desc:
                "La página de comunidad muestra lo que es tendencia. Las notificaciones y correos se añadirán más adelante.",
            },
          },

          footer: {
            title: "¿Necesitas ayuda con un problema específico?",
            desc:
              "Consulta las preguntas frecuentes o contacta con soporte incluyendo tu ID personal.",
          },
        },

        faqs: {
          title: "FAQs",
          subtitle: "Respuestas rápidas sobre reportes, seguimiento, cuentas y soporte.",
          search: "Buscar preguntas...",
          clear: "Limpiar",
          noResultsTitle: "Sin resultados",
          noResultsBody: "Prueba otras palabras clave.",
          openQuestion: "Abrir pregunta",
          categories: {
            general: "General",
            accountAccess: "Cuenta y acceso",
            reporting: "Reportes",
            statusTracking: "Estado y seguimiento",
            community: "Comunidad",
            admin: "Admin",
            profileSettings: "Perfil y ajustes",
            privacySecurity: "Privacidad y seguridad",
            technical: "Técnico",
            roadmap: "Hoja de ruta",
          },
          items: {
            whatIsCitizenVoice: {
              q: "¿Qué es CitizenVoice?",
              a: "CitizenVoice es una plataforma que permite a los ciudadanos reportar problemas de la comunidad, seguir su progreso y mantenerse informados sobre lo que pasa en su zona.",
            },
            whoCanUse: {
              q: "¿Quién puede usar CitizenVoice?",
              a: "Cualquiera puede ver reportes como invitado. Para enviar reportes o interactuar (me gusta/comentar), debes crear una cuenta e iniciar sesión.",
            },
            isItFree: {
              q: "¿CitizenVoice es gratis?",
              a: "Sí, CitizenVoice es gratuito para los ciudadanos.",
            },
            supportedCities: {
              q: "¿Qué ciudades están soportadas?",
              a: "El soporte depende de la participación de la administración local. Se pueden añadir más ciudades con el tiempo.",
            },
            needAccount: {
              q: "¿Necesito una cuenta para usar CitizenVoice?",
              a: "Puedes navegar problemas de la comunidad sin cuenta. Reportar, dar me gusta y comentar requiere iniciar sesión.",
            },
            createAccount: {
              q: "¿Cómo creo una cuenta?",
              a: "Ve a Registrarse, ingresa tus datos y confirma. Después podrás iniciar sesión y empezar a reportar problemas.",
            },
            changePersonalId: {
              q: "¿Puedo cambiar mi ID personal?",
              a: "No. Por razones de seguridad, el ID personal no se puede cambiar después de crear la cuenta.",
            },
            forgotPassword: {
              q: "¿Qué pasa si olvido mi contraseña?",
              a: "Actualmente, el restablecimiento de contraseña se gestiona contactando al soporte. Más adelante se puede añadir una opción de autoservicio.",
            },
            logout: {
              q: "¿Cómo cierro sesión?",
              a: "Abre Perfil o Ajustes y haz clic en Cerrar sesión para terminar tu sesión en este dispositivo.",
            },
            howToReport: {
              q: "¿Cómo reporto un problema?",
              a: "Inicia sesión como ciudadano, ve a Reportar, completa el formulario (título, categoría, ciudad, descripción), opcionalmente agrega una foto y envía.",
            },
            whatIssues: {
              q: "¿Qué tipos de problemas puedo reportar?",
              a: "Ejemplos: daños en la carretera, problemas de agua, alumbrado público, gestión de residuos, seguridad pública y más.",
            },
            addPhoto: {
              q: "¿Puedo añadir fotos a mi reporte?",
              a: "Sí. Las fotos ayudan a los admins a entender más rápido el problema y verificar ubicación y gravedad.",
            },
            editReport: {
              q: "¿Puedo editar un reporte después de enviarlo?",
              a: "Actualmente no se pueden editar reportes después del envío. Si necesitas cambios, contacta soporte o crea un nuevo reporte con los datos correctos.",
            },
            deleteReport: {
              q: "¿Puedo eliminar un reporte?",
              a: "No. Los reportes se guardan por transparencia y auditoría. Los admins pueden rechazar reportes inválidos o duplicados.",
            },
            statusMeaning: {
              q: "¿Qué significan los estados del reporte?",
              a: "Pendiente: esperando revisión. En progreso: en proceso. Resuelto: arreglado. Rechazado: inválido, duplicado o no aplicable.",
            },
            trackMyReports: {
              q: "¿Cómo hago seguimiento a mis reportes?",
              a: "Ve a Mis reportes. Verás todos los reportes enviados y su estado actual.",
            },
            notifyStatusChanges: {
              q: "¿Me notificarán cuando cambie el estado?",
              a: "Verás actualizaciones en la app. Las notificaciones por email se podrán habilitar más adelante cuando se conecten al backend.",
            },
            seeOtherReports: {
              q: "¿Puedo ver reportes de otros usuarios?",
              a: "Sí, la página Comunidad muestra problemas reportados por otros ciudadanos (según los filtros que elijas).",
            },
            likeComment: {
              q: "¿Puedo dar me gusta o comentar reportes?",
              a: "Sí, pero solo si has iniciado sesión. Los invitados pueden navegar, pero no interactuar.",
            },
            whyNoGuestLike: {
              q: "¿Por qué los invitados no pueden dar me gusta o comentar?",
              a: "Para evitar spam y asegurar responsabilidad. Las interacciones están vinculadas a cuentas de usuario.",
            },
            whoManagesReports: {
              q: "¿Quién gestiona los reportes?",
              a: "Los admins revisan reportes, actualizan estados, agregan notas y gestionan usuarios.",
            },
            adminAnalytics: {
              q: "¿Qué es Analítica de Admin?",
              a: "Los admins pueden ver estadísticas como reportes por ciudad, categoría, distribución por estado y tendencia mensual.",
            },
            profileCompletion: {
              q: "¿Qué es la completitud del perfil?",
              a: "Muestra qué tan completo está tu perfil. Agregar teléfono, ciudad y una foto la incrementa.",
            },
            whyCompleteProfile: {
              q: "¿Por qué debería completar mi perfil?",
              a: "Un perfil completo ayuda a los admins a contactarte si necesitan aclaraciones para resolver un problema más rápido.",
            },
            changeEmail: {
              q: "¿Puedo cambiar mi email o teléfono?",
              a: "Sí. Usa Cambiar credenciales para actualizar los datos de tu cuenta.",
            },
            dataSafety: {
              q: "¿Mis datos personales están seguros?",
              a: "CitizenVoice usa autenticación y acceso por roles. Solo los admins pueden acceder a lo necesario para resolver problemas.",
            },
            anonymousReport: {
              q: "¿Mis reportes son anónimos?",
              a: "Otros ciudadanos no ven tus datos personales. Los admins pueden ver detalles limitados para contactarte si es necesario.",
            },
            supportedDevices: {
              q: "¿Qué dispositivos están soportados?",
              a: "CitizenVoice funciona en navegadores de escritorio, tablet y móviles.",
            },
            pageNotLoading: {
              q: "¿Por qué una página no carga?",
              a: "Revisa tu conexión a internet, recarga la página y asegúrate de haber iniciado sesión si la página requiere autenticación.",
            },
            contactSupport: {
              q: "¿Cómo puedo contactar al soporte?",
              a: "Usa la página Contacto para enviar un mensaje. Incluye tu ID personal y detalles del problema.",
            },
            mobileApp: {
              q: "¿Habrá una app móvil?",
              a: "Se puede añadir una app móvil en versiones futuras. La app web actual ya funciona en navegadores móviles.",
            },
            emailNotifications: {
              q: "¿Recibiré notificaciones por email?",
              a: "Las notificaciones por email están planificadas. La página Ajustes se podrá conectar más adelante con preferencias del backend.",
            },
          },
        },

        howTitle: "Cómo funciona",
        faqsTitle: "Preguntas",
        contactTitle: "Contacto",
      },

      settings: {
        delete: {
          passwordPrompt: "Introduce tu contraseña para confirmar la eliminación de la cuenta",
          title: "Eliminar cuenta",
          hint: "Esta acción elimina permanentemente tu cuenta y tus datos. No se puede deshacer.",
          button: "Eliminar cuenta",
          confirmText: "¿Estás seguro de que deseas eliminar tu cuenta?",

        },
        title: "Ajustes",
        appearance: "Apariencia",
        language: "Idioma",
        theme: "Tema",
        density: "Densidad",
        notifications: "Notificaciones",
        privacy: "Privacidad",
        security: "Seguridad",
        changeCredentials: "Cambiar credenciales",
        exportSettings: "Exportar ajustes",
        resetPreferences: "Restablecer preferencias",
        resetDone: "✅ Preferencias restablecidas (la cuenta sigue iniciada).",

        account: "Cuenta",
        session: "Sesión",
        sessionHint: "Si crees que tu cuenta está abierta en otro lugar, cierra sesión.",

        themeHint: "Elige cómo se ve CitizenVoice en este dispositivo.",
        densityHint: "El modo compacto muestra más contenido en la pantalla.",
        languageHint: "Esto cambia el idioma de la interfaz en toda la app.",

        themeSystem: "Sistema",
        themeLight: "Claro",
        themeDark: "Oscuro",

        densityComfortable: "Cómodo",
        densityCompact: "Compacto",

        notificationsHint:
          "Por ahora se guardan localmente (puedes conectarlo al backend más adelante).",

        notif: {
          inApp: "Notificaciones en la app",
          inAppHint: "Muestra alertas dentro de la app.",
          email: "Notificaciones por email",
          emailHint: "Recibe actualizaciones importantes por email.",
          reportUpdates: "Actualizaciones de estado del reporte",
          reportUpdatesHint: "Notifica cuando tu reporte cambie de estado.",
          communityDigest: "Resumen semanal de la comunidad",
          communityDigestHint: "Resumen de los principales problemas en tu zona.",
          adminAlerts: "Alertas de admin",
          adminAlertsHint: "Nuevos reportes, escalaciones, advertencias del sistema.",
        },

        access: {
          reduceMotion: "Reducir animaciones",
          reduceMotionHint: "Menos animaciones para mayor comodidad.",
          highContrast: "Alto contraste",
          highContrastHint: "Mejora la legibilidad con un contraste más fuerte.",
        },

        tipsFooter:
          "Tip: Más adelante puedes sincronizar estas preferencias con la base de datos para mantenerlas en todos los dispositivos.",
      },

      profile: {
        title: "Mi perfil",
        uploadPhoto: "Subir foto",
        fullName: "Nombre completo",
        phone: "Teléfono",
        city: "Ciudad",
        save: "Guardar cambios",
        saving: "Guardando...",
        logout: "Cerrar sesión",
        email: "Email",
        personalId: "ID personal",
        active: "Activo",
        tabs: {
          overview: "Resumen",
          edit: "Editar perfil",
          security: "Seguridad",
        },
        hints: {
          photo: "JPG/PNG, se recomienda una imagen cuadrada.",
          edit: "Estos campos actualizan la información pública de tu perfil.",
          security:
            "Administra la seguridad de tu cuenta. El ID personal no se puede cambiar.",
          emailCopyOk: "✅ Copiado",
          emailCopyFail: "Error al copiar",
          noPhoto: "Sin foto",
        },
      },

      creds: {
        changePasswordTitle: "Cambiar contraseña",
        currentPasswordPlaceholder: "Contraseña actual",
        newPasswordPlaceholder: "Nueva contraseña",
        title: "Cambiar credenciales",
        subtitle: "Actualiza tus datos (no se puede cambiar el ID personal).",
        email: "Email",
        fullName: "Nombre completo",
        phone: "Teléfono",
        city: "Ciudad",
        currentPassword: "Contraseña actual",
        newPassword: "Nueva contraseña",
        confirmNewPassword: "Confirmar nueva contraseña",
        save: "Guardar cambios",
      },
    },
  },

  sq: {
    translation: {
      languages: {
        en: "English",
        it: "Italiano",
        de: "Deutsch",
        es: "Español",
        sq: "Shqip",
      },

      adminUsers: {
        title: "Përdoruesit",
        searchPlaceholder: "Kërko emër/email/ID personal",
        noResults: "Nuk u gjet asnjë përdorues.",

        filters: {
          allRoles: "Të gjitha rolet",
          all: "Të gjitha",
          active: "Aktiv",
          suspended: "I pezulluar",
        },

        table: {
          name: "Emri",
          personalId: "ID personal",
          email: "Email",
          role: "Roli",
          active: "Aktiv",
          actions: "Veprime",
        },

        actions: {
          apply: "Apliko",
          make: "Bëje",
          suspend: "Pezullo",
          activate: "Aktivizo",
        },

        errors: {
          loadFail: "Dështoi ngarkimi i përdoruesve",
          roleFail: "Dështoi përditësimi i rolit",
          statusFail: "Dështoi përditësimi i statusit",
        },
      },


      nav: {
        report: "Raporto",
        myReports: "Raportet e mia",
        community: "Komuniteti",
        helpCenter: "Qendra e Ndihmës",
        howItWorks: "Si funksionon",
        faqs: "Pyetje",
        contact: "Kontakt",
        login: "Hyr",
        profile: "Profili",
        settings: "Cilësimet",
        logout: "Dil",
      },

      auth: {
        signupTitle: "Regjistrohu",
        dontHaveAccount: "Nuk ke ende llogari?",
        createAccount: "Krijo llogari",
        alreadyHaveAccount: "Ke tashmë llogari?",
        password: "Fjalëkalimi",
        agreeText: "Konfirmoj që të dhënat e mia janë të sakta",
        passwordMismatch: "Fjalëkalimet nuk përputhen",
        mustConfirm: "Konfirmo kutinë.",
        accountCreated: "Llogaria u krijua",
        loginFailed: "Hyrja dështoi",
        signupFailed: "Regjistrimi dështoi",
      },

      // ✅ ADDED: full report keys used by Report.jsx
      report: {
        title: "Raporto një problem",
        subtitle: "Ndihmo për të përmirësuar qytetin duke raportuar problemet.",

        tips: {
          clearTitle: "Përdor një titull të qartë",
          addLocation: "Shto vendndodhjen nëse është e mundur",
          photoHelps: "Fotoja ndihmon për zgjidhje më të shpejtë",
        },

        sections: {
          details: "Detajet e problemit",
          detailsSub: "Na trego çfarë ndodhi dhe ku.",
        },

        fields: {
          issueTitle: "Titulli i problemit",
          category: "Kategoria",
          city: "Qyteti",
          description: "Përshkrimi",
          photo: "Foto",
          map: "Vendndodhja në hartë (opsionale)",
        },

        placeholders: {
          issueTitle: "Titull i shkurtër dhe i qartë",
          city: "Shkruaj qytetin",
          description: "Përshkruaj problemin...",
        },

        hints: {
          title: "Shembull: “Gropë pranë Central Ave po krijon trafik.”",
          description: "Përfshi çfarë pe, sa kohë ka dhe nëse është e rrezikshme.",
          submit: "Pas dërgimit, mund ta ndjekësh te “Raportet e mia”.",
          map: "Kliko në hartë për të vendosur pikën.",
          noLocation: "Nuk u zgjodh vendndodhja. Mund të dërgosh edhe pa vendndodhje.",
        },

        actions: {
          useMyLocation: "Përdor vendndodhjen time",
          reset: "Rivendos",
          submit: "Dërgo raportin",
          submitting: "Duke dërguar...",
          removePhoto: "Hiqe",
          clearMarker: "Pastro",
          noMarker: "Nuk ka pikë",
        },

        upload: {
          title: "Shto një foto (opsionale)",
          subtitle: "JPG/PNG • deri 5MB • ndihmon verifikimin",
          button: "Zgjidh skedar",
        },

        errors: {
          required: "Plotëso të gjitha fushat e detyrueshme.",
          titleShort: "Titulli është shumë i shkurtër.",
          descShort: "Përshkrimi është shumë i shkurtër.",
          imageOnly: "Ju lutem ngarkoni një skedar imazhi.",
          imageTooLarge: "Imazhi është shumë i madh (maks 5MB).",
          geoNotSupported: "Gjeolokacioni nuk mbështetet.",
          geoDenied: "Leja e vendndodhjes u refuzua.",
          loginRequired: "Duhet të hysh fillimisht.",
          submitFail: "Dërgimi i raportit dështoi.",
        },

        selected: "Zgjedhur",

        side: {
          title: "Çfarë ndodh më pas?",
          step1: "Raporti ruhet dhe u shfaqet adminëve.",
          step2: "Adminët e shqyrtojnë dhe përditësojnë statusin.",
          step3: "Ndiq ndryshimet te “Raportet e mia”.",
        },
      },

      common: {
        in_progress: "Në progres",
        loading: "Duke u ngarkuar...",
        saving: "Duke ruajtur...",
        uploading: "Duke ngarkuar...",
        save: "Ruaj",
        cancel: "Anulo",
        reset: "Rivendos",
        searchPlaceholder: "Kërko...",
        anyStatus: "Çdo status",
        pending: "Në pritje",
        inProgress: "Në progres",
        resolved: "E zgjidhur",
        rejected: "E refuzuar",
        sortNewest: "Më të rejat",
        sortOldest: "Më të vjetrat",
        sortStatus: "Statusi",
        prev: "Mbrapa",
        next: "Para",
        page: "Faqja",
        of: "nga",

        // ✅ ADDED: used by pagination
        perPage: "{{n}} për faqe",

        open: "Hap",
        copy: "Kopjo",
        yes: "Po",
        no: "Jo",
        signedInAs: "I kyçur si",
        role: "Roli",
        active: "Aktiv",
        memberSince: "Anëtar që nga",
        profileCompletion: "Plotësimi i profilit",
        improveProfileHint: "Shto telefon/qytet/foto për ta përmirësuar profilin.",
        accountOverview: "Përmbledhje e llogarisë",
        session: "Sesioni",
        endSessionHint: "Mbyll këtë sesion në këtë pajisje.",
        openBtn: "Hap",

        admin: "Admin",
        citizen: "Qytetar",
      },

      citizenHome: {
        top: {
          notifications: "Njoftime",
          profile: "Profili",
          settings: "Cilësimet",
        },
        cta: {
          start: "Fillo →",
          view: "Shiko →",
          explore: "Eksploro →",
        },
        helpCenter: {
          title: "Qendra e Ndihmës",
          subtitle: "Udhëzues + pyetje të shpeshta",
          links: {
            how: "Si funksionon",
            faqs: "Pyetje",
            contact: "Kontakto mbështetjen",
            ask: "Bëj një pyetje",
          },
          tip: "Këshillë: nëse s’gjen përgjigje te FAQ, përdor “Bëj një pyetje”.",
        },
        resources: {
          title: "Burime",
          subtitle: "Informacion i dobishëm për qytetarët",
          tiles: {
            city: "Burime të qytetit",
            citySub: "Shërbime & kontakte",
            feed: "Rrjedha e komunitetit",
            feedSub: "Shiko çfarë po ndodh",
            track: "Ndiq progresin",
            trackSub: "Statuset & përditësimet",
            newReport: "Raport i ri",
            newReportSub: "Krijo raport shpejt",
          },
        },
        alerts: {
          seeAll: "Shiko të gjitha →",
          title: "Njoftime të komunitetit",
          water: "Mirëmbajtje e furnizimit me ujë të premten (08:00–17:00).",
          road: "Punime rrugore në Central Ave — prit trafik të ngadalësuar.",
        },
        footer: {
          title: "Do ndihmë më shpejt?",
          subtitle: "Kontrollo fillimisht FAQ ose kontakto mbështetjen nëse është urgjente.",
          faqs: "Pyetje",
          contact: "Kontakt",
        },

        welcome: "Mirë se vini në CitizenVoice",
        subtitle: "Komuniteti yt ka rëndësi. Raporto probleme, ndiq progresin dhe qëndro i informuar.",
        actions: {
          report: {
            title: "Raporto një problem",
            desc: "Dërgo një problem të ri për lagjen tënde.",
          },
          myReports: {
            title: "Raportet e mia",
            desc: "Shiko statusin e raporteve të dërguara.",
          },
          community: {
            title: "Probleme të komunitetit",
            desc: "Shiko problemet e raportuara nga qytetarë të tjerë.",
          },
        },
      },

      contact: {
        title: "Kontakt",
        subtitle: "Na dërgo një mesazh dhe do të të kontaktojmë.",
        fields: {
          email: "Email",
          phone: "Numri i telefonit",
          topic: "Tema",
          description: "Përshkrimi",
        },
        placeholders: {
          email: "shembull@email.com",
          topic: "Tema",
          description: "Shkruaj mesazhin tënd...",
          phone: "Numri i telefonit",
        },
        submit: "Dërgo",
        sending: "Duke dërguar...",
        success: "✅ Mesazhi u dërgua me sukses!",
      },

      home: {
        title: "Mirë se vini në CitizenVoice",
        subtitle: "Shiko problemet e komunitetit. Hyr për të raportuar dhe ndjekur raportet e tua.",
        continueGuest: "Vazhdo si mysafir",
      },

      community: {
        title: "Raportet e Komunitetit",
        subtitle: "Probleme të raportuara nga qytetarët në komunitetin tuaj.",
        guestNotice: "Po shfleton si mysafir. Hyr për të raportuar, bërë like ose komentuar.",
        searchPlaceholder: "Kërko titull/përshkrim...",
        cityPlaceholder: "Qyteti",
        categoryPlaceholder: "Kategoria",
        sortPrefix: "Rendit:",
        saveFilters: "Ruaj filtrat",
        filtersSaved: "✅ Filtrat u ruajtën",
        loginToInteract: "Hyr për të bashkëvepruar →",
        loading: "Duke ngarkuar raportet...",
        noResults: "Nuk u gjetën raporte.",
        viewDetails: "Shiko detajet →",
        like: "🤍 Like",
        liked: "❤️ E pëlqyer",
        loginRequiredLike: "Duhet të hysh për të bërë like.",
        loginRequiredComment: "Duhet të hysh për të komentuar.",
        loginRequiredTooltip: "Kërkohet hyrja",
        issuePhotoAlt: "problem",
        comments: "Komentet",
        loadComments: "Ngarko komentet",
        hideComments: "Fshih komentet",
        loginToComment: "Hyr për të komentuar",
        loginToCommentPlaceholder: "Hyr për të komentuar...",
        writeComment: "Shkruaj një koment...",
        post: "Posto",
        moreComments: "+{{n}} komente të tjera",
        noCommentsYet: "Ende s’ka komente.",
        perPage: "{{n}} / faqe",
        labels: {
          category: "Kategoria",
          city: "Qyteti",
          status: "Statusi",
          reportedAt: "Raportuar më",
        },
      },

      profilePro: {
        title: "Profili im",
        signedInAs: "I kyçur si",
        tabs: {
          overview: "Përmbledhje",
          edit: "Ndrysho profilin",
          security: "Siguria",
        },
        photoHint: "JPG/PNG, rekomandohet foto katrore.",
        memberSince: "Anëtar që nga",
        accountOverview: {
          title: "Përmbledhje e llogarisë",
        },
        role: "Roli",
        completion: {
          title: "Plotësimi i profilit",
          hint: "Shto telefon/qytet/foto për ta përmirësuar profilin.",
        },
        actions: {
          editProfile: "Ndrysho profilin",
        },
      },

      admin: {
        brand: "CitizenVoice Admin",
        roleTag: "ADMIN",
        nav: {
          dashboard: "Paneli",
          reports: "Raportet",
          analytics: "Analitika",
          users: "Përdoruesit",
          auditLog: "Regjistri i auditimit",
          notifications: "Njoftimet",
        },
        reports: { all: "Të gjitha" },
        analytics: {
          title: "Analitika",
          loginRequired: "Kërkohet hyrja (mungon token-i).",
          invalidResponse: "Serveri ktheu një përgjigje të pavlefshme.",
          cards: { total: "Totali i raporteve" },
          statusBreakdown: "Shpërndarja sipas statusit",
          topCities: "Qytetet kryesore",
          byCategory: "Raporte sipas kategorisë",
          monthlyTrend: "Trendi mujor",
        },
      },

      adminHome: {
        contacts: {
          title: "Mesazhe kontakti",
          empty: "Nuk ka ende mesazhe kontakti.",

          cols: {
            email: "Email",
            phone: "Telefon",
            topic: "Tema",
            message: "Mesazhi",
            date: "Data",
            status: "Statusi",
          },

          status: {
            new: "I ri",
            read: "I lexuar",
            archived: "I arkivuar",
          },
        },
        welcome: "Mirë se vini në CitizenVoice",
        title: "Paneli i Adminit",
        subtitle: "Menaxho raportet, qytetarët dhe të dhënat e komunitetit.",
        cards: { totalReports: "Totali i raporteve" },
        recent: {
          title: "Raporte të fundit",
          cols: { issue: "Problemi", citizen: "Qytetari", status: "Statusi", date: "Data" },
          empty: "Nuk u gjetën raporte",
        },
        alerts: {
          title: "Sinjalizime & Njoftime",
          highVolume: "Sot ka shumë raporte të reja.",
          maintenance: "Mirëmbajtja e sistemit është planifikuar për të premten.",
        },
      },

      errors: {
        failedToLoadCommunity: "Nuk u arrit të ngarkohen raportet",
        failedToLoadComments: "Nuk u arrit të ngarkohen komentet",
        likeFailed: "Nuk u arrit të përditësohet like",
        commentFailed: "Nuk u arrit të postohet komenti",
      },

      // ✅ FIXED/EXPANDED: MyReports keys to match what MyReports.jsx calls
      myReports: {
        title: "Raportet e mia",
        subtitle: "Ndjek statusin e raporteve që ke dërguar.",
        searchPlaceholder: "Kërko raportet...",
        sortPrefix: "Rendit sipas",
        saveFilters: "Ruaj filtrat",
        filtersSaved: "Filtrat u ruajtën me sukses.",
        noResults: "Nuk u gjetën raporte.",
        errors: {
          loadFail: "Nuk u arrit të ngarkohen raportet.",
        },
        labels: {
          status: "Statusi",
          city: "Qyteti",
          reportedAt: "Raportuar më",
        },
        issuePhotoAlt: "Foto e problemit",
      },

      // ✅ FIXED: help is now Albanian and NOT duplicated / not nested incorrectly
      help: {
        how: {
          title: "Si funksionon",
          subtitle:
            "CitizenVoice i ndihmon qytetarët të raportojnë probleme, të ndjekin progresin dhe të qëndrojnë të informuar.",
          ctaFaq: "Shiko FAQ",
          ctaContact: "Kontakt",
          steps: {
            guest: {
              title: "Shfleto si mysafir",
              desc:
                "Mund t’i shikosh problemet e komunitetit pa hyrë. Filtrat ndihmojnë të gjesh raporte sipas qytetit, kategorisë dhe statusit.",
            },
            account: {
              title: "Krijo llogari",
              desc:
                "Regjistrohu si qytetar për të dërguar raporte dhe për të bashkëvepruar me komunitetin.",
            },
            report: {
              title: "Raporto një problem",
              desc:
                "Shto titull, kategori, qytet dhe përshkrim. Fotot i ndihmojnë adminët ta zgjidhin më shpejt.",
            },
            track: {
              title: "Ndiq progresin",
              desc:
                "Përdor “Raportet e mia” për përditësimet: Në pritje → Në progres → E zgjidhur (ose E refuzuar).",
            },
            admin: {
              title: "Adminët menaxhojnë & përditësojnë",
              desc:
                "Adminët i shqyrtojnë raportet, përditësojnë statuset dhe shtojnë shënime. Analitika ndihmon të identifikohen zonat problematike.",
            },
            informed: {
              title: "Qëndro i informuar",
              desc:
                "Faqja e komunitetit tregon çfarë është në trend. Njoftimet dhe email-digest mund të shtohen më vonë.",
            },
          },
          footer: {
            title: "Të duhet ndihmë për një problem specifik?",
            desc:
              "Kontrollo FAQ ose kontakto mbështetjen me detaje (përfshirë ID-në personale).",
          },
        },

        // keep your sq help.faqs here (your big sq faqs object)
        // faqs: { ... }
      },

      // ✅ FIXED: settings/profile/creds are now at root translation level (NOT inside help)
      settings: {
        delete: {
              passwordPrompt: "Shkruani fjalëkalimin tuaj për të konfirmuar fshirjen e llogarisë",
          title: "Fshi llogarinë",
          hint: "Ky veprim e fshin përgjithmonë llogarinë tuaj dhe të dhënat tuaja. Nuk mund të rikthehet.",
          button: "Fshi llogarinë",
          confirmText: "A jeni i sigurt që dëshironi të fshini llogarinë tuaj?",
        },
        title: "Cilësimet",
        appearance: "Pamja",
        language: "Gjuha",
        theme: "Tema",
        density: "Dendësia",
        notifications: "Njoftimet",
        privacy: "Privatësia",
        security: "Siguria",
        changeCredentials: "Ndrysho kredencialet",
        exportSettings: "Eksporto cilësimet",
        resetPreferences: "Rivendos preferencat",
        resetDone: "✅ Preferencat u rivendosën (llogaria mbeti e kyçur).",

        account: "Llogaria",
        session: "Sesioni",
        sessionHint: "Nëse dyshon se llogaria është e hapur diku tjetër, dil.",

        themeHint: "Zgjidh si duket CitizenVoice në këtë pajisje.",
        densityHint: "Modaliteti kompakt shfaq më shumë përmbajtje në ekran.",
        languageHint: "Kjo ndryshon gjuhën e ndërfaqes në të gjithë aplikacionin.",

        themeSystem: "Sistemi",
        themeLight: "E çelët",
        themeDark: "E errët",

        densityComfortable: "Komode",
        densityCompact: "Kompakte",

        notificationsHint:
          "Për momentin ruhen lokalisht (më vonë mund t’i lidhësh me backend).",

        notif: {
          inApp: "Njoftime brenda aplikacionit",
          inAppHint: "Shfaq njoftime brenda aplikacionit.",
          email: "Njoftime me email",
          emailHint: "Merr përditësime të rëndësishme me email.",
          reportUpdates: "Përditësime të statusit të raportit",
          reportUpdatesHint: "Njofto kur raporti yt ndryshon status.",
          communityDigest: "Përmbledhje javore e komunitetit",
          communityDigestHint: "Përmbledhje e problemeve kryesore në zonën tënde.",
          adminAlerts: "Njoftime për admin",
          adminAlertsHint: "Raporte të reja, eskalime, paralajmërime sistemi.",
        },

        access: {
          reduceMotion: "Redukto animacionet",
          reduceMotionHint: "Më pak animacione për rehati më të mirë.",
          highContrast: "Kontrast i lartë",
          highContrastHint: "Përmirëson lexueshmërinë me kontrast më të fortë.",
        },

        tipsFooter:
          "Këshillë: Më vonë mund t’i sinkronizosh këto preferenca në databazë për t’i mbajtur në të gjitha pajisjet.",
      },

      profile: {
        title: "Profili im",
        uploadPhoto: "Ngarko foto",
        fullName: "Emri dhe mbiemri",
        phone: "Telefoni",
        city: "Qyteti",
        save: "Ruaj ndryshimet",
        saving: "Duke ruajtur...",
        logout: "Dil",
        email: "Email",
        personalId: "ID personale",
        active: "Aktiv",
        tabs: {
          overview: "Përmbledhje",
          edit: "Ndrysho profilin",
          security: "Siguria",
        },
        hints: {
          photo: "JPG/PNG, rekomandohet foto katrore.",
          edit: "Këto fusha përditësojnë informacionin publik të profilit.",
          security:
            "Menaxho sigurinë e llogarisë. ID personale nuk mund të ndryshohet.",
          emailCopyOk: "✅ U kopjua",
          emailCopyFail: "Kopjimi dështoi",
          noPhoto: "Pa foto",
        },
      },

      creds: {
        changePasswordTitle: "Ndrysho fjalëkalimin",
        currentPasswordPlaceholder: "Fjalëkalimi aktual",
        newPasswordPlaceholder: "Fjalëkalim i ri",
        title: "Ndrysho kredencialet",
        subtitle: "Përditëso të dhënat (ID personale nuk mund të ndryshohet).",
        email: "Email",
        fullName: "Emri dhe mbiemri",
        phone: "Telefoni",
        city: "Qyteti",
        currentPassword: "Fjalëkalimi aktual",
        newPassword: "Fjalëkalim i ri",
        confirmNewPassword: "Konfirmo fjalëkalimin e ri",
        save: "Ruaj ndryshimet",
      },
    },
  },

}

const savedLng =
  localStorage.getItem(LOCALE_KEY) ||
  localStorage.getItem("i18nextLng") ||
  "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLng,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

// ✅ keep both keys always synced
i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LOCALE_KEY, lng);
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
