import { useState, useEffect, useRef, useContext, createContext } from "react";

// ── TRANSLATIONS (UI chrome only — pregenerated astrological content stays in Spanish) ──
const TRANSLATIONS = {
  es: {
    loginInvalidEmail: "Por favor ingresa un email válido.",
    loginNoAccess: "Este email no tiene acceso a Cosmicall. Si ya compraste tu acceso, contacta a atencionalcoientem@gmail.com",
    loginConnError: "Error de conexión. Intenta de nuevo.",
    loginVerifying: "Verificando acceso…",
    loginTitleApp: "Cosmicall",
    loginSubtitle: "Tu guía astrológica personalizada",
    loginCardTitle: "Ingresar a Cosmicall",
    loginCardDesc: "Ingresa el email con el que compraste tu acceso.",
    loginEmailLabel: "TU EMAIL",
    loginEmailPlaceholder: "tu@email.com",
    loginButtonVerifying: "Verificando…",
    loginButtonEnter: "Entrar ✨",
    loginNoAccessFooter: "¿No tienes acceso? Contáctanos en",

    adminPanelTitle: "⚙️ Panel de Accesos",
    adminActiveTotal: "{active} activos · {total} total",
    adminAddNew: "➕ Dar acceso nuevo",
    adminNamePlaceholder: "Nombre (opcional)",
    adminEmailPlaceholder: "email@ejemplo.com *",
    adminInvalidEmail: "⚠ Email inválido",
    adminAccessGranted: "✅ Acceso dado correctamente",
    adminAddError: "❌ Error al agregar. Puede que el email ya exista.",
    adminSaving: "Guardando…",
    adminGiveAccess: "Dar Acceso ✨",
    adminSearchPlaceholder: "🔍 Buscar por nombre o email…",
    adminLoading: "Cargando accesos…",
    adminNoResults: "No se encontraron resultados",
    adminNoAccesses: "Aún no hay accesos registrados",
    adminNoName: "Sin nombre",
    adminPause: "Pausar",
    adminActivate: "Activar",
    adminRemoveConfirm: "¿Quitar acceso a {email}?",

    citySearchPlaceholder: "Escribe tu ciudad (ej: Cajicá, Mumbai…)",
    citySearchNotFound: "No encontrada. Intenta con la ciudad principal más cercana.",

    perfilFormTitle: "Tu Perfil Astral",
    perfilFormSubtitle: "Para lecturas personalizadas con tu carta natal real",
    perfilStep1Title: "¿Cómo te llamas?",
    perfilNamePlaceholder: "Tu nombre completo",
    perfilStep2Title: "Elige tu avatar",
    perfilStep2Subtitle: "Así te vamos a saludar en la app",
    perfilGenderMujer: "Mujer",
    perfilGenderHombre: "Hombre",
    perfilGenderNeutro: "Neutro",
    perfilStep3Title: "Fecha y hora de nacimiento",
    perfilDateLabel: "FECHA *",
    perfilTimeLabel: "HORA *",
    perfilTimeHint: "(si no la sabes, deja 12:00)",
    perfilTimeNote: "💡 La hora exacta da el Ascendente y las 12 casas. Si naciste a mediodía exacto, usa el formato 24h: las 12 del mediodía son 12:00, no 00:00.",
    perfilStep4Title: "Ciudad de nacimiento",
    perfilBack: "← Atrás",
    perfilContinue: "Continuar →",
    perfilCalculate: "✨ Calcular mi carta natal",

    settingsTitle: "Configuración",
    settingsMyProfile: "Mi perfil",
    settingsEditChart: "Editar mi carta natal",
    settingsMyAccount: "Mi cuenta",
    settingsChangePlan: "Cambiar plan o cancelar suscripción",
    settingsOpeningPortal: "Abriendo gestión de plan…",
    settingsHelpCenter: "Centro de ayuda",
    settingsContactUs: "Contáctanos",
    settingsContactMessage: "Si tienes problemas o preguntas, contáctanos a:",
    settingsPortalError: "No pudimos abrir la gestión de tu plan. Si el problema persiste, escríbenos a atencionalcoientem@gmail.com.",
    settingsLogout: "Cerrar sesión",
    settingsCancelSubscription: "Cancelar suscripción",
    settingsHotmartCancelTitle: "Cancelar tu suscripción",
    settingsHotmartStep1: "1. Entra a tu área de comprador en Hotmart con el correo y la contraseña que usaste al comprar:",
    settingsHotmartStep1Link: "Ir a Hotmart",
    settingsHotmartStep2: "2. Busca tu suscripción activa de CosmiCall en la sección de tus compras.",
    settingsHotmartStep3: "3. Selecciónala y elige la opción de cancelar suscripción. Es un proceso sencillo que puedes hacer tú mismo.",
    settingsHotmartCancelFallback: "Si no logras hacerlo manualmente, escríbenos a:",
    settingsChangePlanTitle: "Cambiar de plan",
    settingsChangePlanMessage: "Para cambiar de plan necesitamos hacerlo nosotros desde Hotmart. Escríbenos indicando a qué plan quieres cambiarte a:",
    settingsHotmartClose: "Entendido",

    appHeaderBrand: "Cosmicall",
    appAdminButton: "⚙️ Accesos",
    appMyChartButton: "Mi Carta ✨",
    appSettingsAria: "Configuración",
    appProfileModalTitle: "Perfil Astral",
    appSaveErrorTitle: "No se pudo guardar en la nube",
    appSaveErrorDesc: "Tu carta se calculó bien, pero el guardado falló. Copia este mensaje para revisarlo:",
    appCopyError: "📋 Copiar error",
    appContinue: "Continuar →",
    appCalculatingChart: "Calculando tu carta natal con datos astronómicos precisos…",
    appSavingProfile: "Guardando tu perfil…",
    appCalcError: "⚠ Error al calcular la carta: {error}. Revisa tu conexión e intenta de nuevo.",
    appActivateChart: "Activa tu carta natal",
    appActivateChartDesc: "Para lecturas personalizadas",
    appNatalChartTitle: "🌌 Tu Carta Natal",
    appNatalChartCardTitle: "Carta Natal Personalizada",
    appNatalChartCardDesc: "Ingresa tu fecha, hora y lugar de nacimiento para calcular tu carta natal real con los 10 planetas, 12 casas, Lilith y todos los aspectos.",
    appCalculateChart: "Calcular mi Carta ✨",
    appEdit: "Editar",
    appNavInicio: "Inicio",
    appNavCarta: "Carta",
    appNavAmor: "Amor",
    appNavTarot: "Tarot",
    appNavMas: "Más",
    appTileTarotLabel: "Tarot",
    appTileTarotDesc: "Tirada de 3 cartas",
    appTileMoreLabel: "Ver más",
    appTileMoreDesc: "Luna, eventos, signos",

    masSubLuna: "🌙 Luna",
    masSubEventos: "📅 Eventos",
    masSubPlanetas: "🪐 Planetas",
    masSubSignos: "♈ Signos",
    masPlanetPositionsTitle: "POSICIONES PLANETARIAS DE HOY",

    signosListHint: "Toca cualquier signo para ver sus características completas, planeta regente, fortalezas y compatibilidades.",
    signDetailBack: "← Volver a todos los signos",
    signDetailElement: "ELEMENTO",
    signDetailRulerPlanet: "PLANETA REGENTE",
    signDetailColor: "COLOR",
    signDetailModality: "MODALIDAD",
    signDetailWhyTitle: "¿POR QUÉ {ruler}?",
    signDetailWhyBody: "{sign} está regido por {ruler}, {rulerWhy}. Por eso esta energía marca tanto su forma de ser.",
    signDetailTraitsTitle: "CARACTERÍSTICAS PRINCIPALES",
    signDetailStrengths: "💪 FORTALEZAS",
    signDetailChallenges: "⚡ DESAFÍOS",
    signDetailLoveStyle: "💕 CÓMO AMA {sign}",
    signDetailCompatible: "✨ MÁS COMPATIBLE CON",

    amorTitle: "Amor & Compatibilidad",
    amorSubtitle: "Elige cómo quieres explorar la compatibilidad. Empieza por la primera opción si no estás segura.",
    amorStartHere: "EMPIEZA AQUÍ",
    amorOption1Title: "Compatibilidad por Signos",
    amorOption1Desc: "Selecciona esta opción si solo conoces el signo zodiacal de las dos personas (ej: Tauro y Leo). No necesitas fecha ni hora exacta. Es la más rápida.",
    amorOption2Title: "Compatibilidad Profunda (con tu propia carta)",
    amorOption2Desc: "Selecciona esta opción si quieres saber qué signos son compatibles contigo en general — para matrimonio, romance, intimidad, etc. Solo se necesita tu carta natal, no la de otra persona.",
    amorOption2Warn: "⚠ Necesitas activar tu carta natal primero (botón \"Mi Carta\" arriba)",
    amorOption3Title: "Compatibilidad con Otra Persona",
    amorOption3Desc: "Selecciona esta opción si quieres comparar tu carta con la de alguien específico (tu pareja, un crush, etc). Necesitas saber su fecha Y hora de nacimiento. Es el análisis más completo que existe.",
    amorOption3Warn: "⚠ Necesitas activar tu carta natal primero",
    amorBack: "← Volver",
    amorBySignTitle: "Por Signo Solar",
    amorYourSign: "Tu signo:",
    amorYourSignSelected: "Tu signo seleccionado. Ahora elige el de la otra persona:",
    amorYourNatalSign: "tu signo natal",
    amorChange: "cambiar",
    amorNeedChartFirst: "Primero necesitas tu carta natal. Ve a \"Mi Carta ✨\" arriba.",
    amorOtherPersonTitle: "Compatibilidad con Otra Persona",
    amorLoadingSaved: "Cargando personas guardadas…",
    amorSavedPeople: "Tus personas guardadas:",
    amorAddNewPerson: "➕ Agregar Nueva Persona",
    amorEditPerson: "Editar Persona",
    amorNewPerson: "Nueva Persona",
    amorWhoIsThisPerson: "¿Quién es esta persona?",
    amorNameLabel: "NOMBRE *",
    amorNamePlaceholder: "Su nombre",
    amorRelationLabel: "RELACIÓN *",
    amorRelPareja: "Pareja",
    amorRelCrush: "Crush",
    amorRelAmistad: "Amistad",
    amorRelFamilia: "Familia",
    amorRelEx: "Ex",
    amorRelOtro: "Otro",
    amorDateOf: "Fecha y hora de {name}",
    amorCityOf: "Ciudad de nacimiento de {name}",
    amorSaveCheckbox: "Guardar a {name} para no escribir sus datos otra vez",
    amorThisPerson: "esta persona",
    amorContinue: "Continuar →",
    amorSaveAndCalculate: "💾 Guardar Cambios y Calcular",
    amorCalculateSynastry: "✨ Calcular Sinastría",
    amorCalculatingSynastry: "Calculando la carta natal y la sinastría…",
    amorMayTakeSeconds: "Puede tardar unos segundos",
    amorCouldNotCalculate: "No se pudo calcular",
    amorTryAgain: "Intentar de nuevo",
    amorResultTitle: "Resultado",
    amorNewQuery: "Nueva consulta",
    amorCompatibilityLabel: "compatibilidad",
    amorYou: "Tú",
    amorHerHim: "Ella/Él",
    amorSecQuimica: "Química y Atracción",
    amorSecDesafio: "Desafíos",
    amorSecPotencial: "Potencial a Largo Plazo",
    amorSecConsejo: "Consejo para esta Pareja",
    amorCatLove: "Amor",
    amorCatEmotional: "Emocional",
    amorCatCommunication: "Comunicación",
    amorCatTrust: "Confianza",
    amorCatIntimacy: "Intimidad",
    amorKarmicTitle: "Conexión Kármica",
    amorKarmicLevelAlta: "Alta",
    amorKarmicLevelMedia: "Media",
    amorKarmicLevelBaja: "Baja",
    amorKarmicNoHits: "No se detectan puntos kármicos fuertes (Lilith/Nodos) entre sus cartas. Esto no es ni bueno ni malo — simplemente es una conexión más liviana en ese sentido.",
    amorKarmicNeedChart: "Calcula la sinastría completa con la carta natal de esta persona para ver si hay una conexión kármica (Luna Negra y Nodos Lunares).",
    amorOption4Title: "Mis mejores matches",
    amorOption4Desc: "Compara tu signo solar contra los 12 signos del zodiaco y descubre con cuáles tienes mejor compatibilidad.",
    amorOption4Warn: "Necesitas tu carta natal o elegir tu signo primero.",
    topMatchesTitle: "Tus Mejores Matches",
    topMatchesSubtitle: "Compatibilidad de tu signo solar contra los 12 signos del zodiaco",

    compatibleSignsTitle: "Tus Signos Compatibles",
    compatibleSignsSubtitle: "Basado en tu carta natal · Toca para ver el análisis",
    compatibleSignsHintTitle: "💡 Cada tarjeta muestra el número de casa",
    compatibleSignsHintBody: "Estos datos vienen directo de tu carta natal real (sistema Placidus) — el mismo cálculo que ves en \"Mi Carta Natal\". Cada signo corresponde a la casa indicada en su etiqueta.",
    compatibleSignsFooterNote: "💡 Estos son arquetipos energéticos, no recetas. Lo importante es la resonancia, no solo el signo solar.",
    compatibleSignsViewMore: "Ver ›",

    tarotTitle: "Lectura de Tarot",
    tarotFilterAmor: "Amor",
    tarotFilterTrabajo: "Trabajo",
    tarotFilterDinero: "Dinero",
    tarotFilterDecision: "Decisión",
    tarotFilterMiCamino: "Mi camino",
    tarotCenterMind: "Centra tu mente{intentSuffix} y presiona para revelar las cartas.",
    tarotIntentSuffix: " en {intent}",
    tarotReveal3: "Revelar 3 Cartas",
    tarotTapToReveal: "Toca para revelar",
    tarotNewDraw: "Nueva Tirada",
    tarotPast: "PASADO",
    tarotPresent: "PRESENTE",
    tarotFuture: "FUTURO",
    tarotQPast: "¿Qué dejaste atrás?",
    tarotQPresent: "¿Dónde estás ahora?",
    tarotQFuture: "¿Qué se aproxima?",

    cartaAscendant: "Ascendente",
    cartaMidheaven: "Medio Cielo",
    cartaNorthNode: "Nodo Norte",
    cartaAscSub: "tu máscara social",
    cartaMcSub: "tu vocación",
    cartaNnSub: "tu propósito",
    cartaTabPlanetas: "Planetas",
    cartaTabCasas: "Casas",
    cartaTabAspectos: "Aspectos",
    cartaTabTransitos: "Tránsitos",
    cartaNoAspects: "No hay aspectos mayores activos",
    cartaNoTransits: "Sin tránsitos activos ahora",
    cartaTodaySkyPositions: "POSICIONES DE HOY EN EL CIELO",
    cartaExact: "Exacto",
    cartaHarmonious: "Armónico",
    cartaTension: "Tensión",
    cartaMajor: "Mayor",
    cartaHouse: "Casa {n}",
    cartaLilithTitle: "Lilith (Luna Negra)",

    biorhythmTitle: "Mi Biorritmo",
    biorhythmDesc: "Ciclos naturales de energía calculados desde tu fecha de nacimiento — cuándo rindes más y cuándo conviene bajar el ritmo.",
    biorhythmFisico: "Físico",
    biorhythmEmocional: "Emocional",
    biorhythmMental: "Mental",
    biorhythmToday: "HOY",
    biorhythmYesterday: "Ayer",
    biorhythmTodayLabel: "Hoy",

    lunarTipsTitle: "TIPS PRÁCTICOS — {moon}",
    astroEventsTitle: "PRÓXIMOS EVENTOS ASTROLÓGICOS",
    moonPhasesTitle: "FASES DEL MES",

    oracleAdvice: "Consejo del Día",
    oracleGreeting: "Hola, {name}",
    oracleSectionEnergia: "Energía General",
    oracleSectionAmor: "Amor y Relaciones",
    oracleSectionTrabajo: "Trabajo y Dinero",
    interAspectsTitle: "ASPECTOS INTER-CARTA ({count} encontrados)",

    langToggleLabel: "Idioma",
  },
  en: {
    loginInvalidEmail: "Please enter a valid email.",
    loginNoAccess: "This email doesn't have access to Cosmicall. If you already purchased access, contact atencionalcoientem@gmail.com",
    loginConnError: "Connection error. Please try again.",
    loginVerifying: "Verifying access…",
    loginTitleApp: "Cosmicall",
    loginSubtitle: "Your personalized astrological guide",
    loginCardTitle: "Sign in to Cosmicall",
    loginCardDesc: "Enter the email you used to purchase your access.",
    loginEmailLabel: "YOUR EMAIL",
    loginEmailPlaceholder: "you@email.com",
    loginButtonVerifying: "Verifying…",
    loginButtonEnter: "Enter ✨",
    loginNoAccessFooter: "Don't have access? Contact us at",

    adminPanelTitle: "⚙️ Access Panel",
    adminActiveTotal: "{active} active · {total} total",
    adminAddNew: "➕ Grant new access",
    adminNamePlaceholder: "Name (optional)",
    adminEmailPlaceholder: "email@example.com *",
    adminInvalidEmail: "⚠ Invalid email",
    adminAccessGranted: "✅ Access granted successfully",
    adminAddError: "❌ Error adding. The email may already exist.",
    adminSaving: "Saving…",
    adminGiveAccess: "Grant Access ✨",
    adminSearchPlaceholder: "🔍 Search by name or email…",
    adminLoading: "Loading accesses…",
    adminNoResults: "No results found",
    adminNoAccesses: "No accesses registered yet",
    adminNoName: "No name",
    adminPause: "Pause",
    adminActivate: "Activate",
    adminRemoveConfirm: "Remove access for {email}?",

    citySearchPlaceholder: "Type your city (e.g. Cajicá, Mumbai…)",
    citySearchNotFound: "Not found. Try the nearest major city.",

    perfilFormTitle: "Your Astral Profile",
    perfilFormSubtitle: "For personalized readings based on your real natal chart",
    perfilStep1Title: "What's your name?",
    perfilNamePlaceholder: "Your full name",
    perfilStep2Title: "Choose your avatar",
    perfilStep2Subtitle: "This is how we'll greet you in the app",
    perfilGenderMujer: "Woman",
    perfilGenderHombre: "Man",
    perfilGenderNeutro: "Neutral",
    perfilStep3Title: "Date and time of birth",
    perfilDateLabel: "DATE *",
    perfilTimeLabel: "TIME *",
    perfilTimeHint: "(if you don't know it, leave 12:00)",
    perfilTimeNote: "💡 The exact time gives the Ascendant and the 12 houses. If you were born at exact noon, use 24h format: 12 noon is 12:00, not 00:00.",
    perfilStep4Title: "City of birth",
    perfilBack: "← Back",
    perfilContinue: "Continue →",
    perfilCalculate: "✨ Calculate my natal chart",

    settingsTitle: "Settings",
    settingsMyProfile: "My profile",
    settingsEditChart: "Edit my natal chart",
    settingsMyAccount: "My account",
    settingsChangePlan: "Change plan or cancel subscription",
    settingsOpeningPortal: "Opening plan management…",
    settingsHelpCenter: "Help center",
    settingsContactUs: "Contact us",
    settingsContactMessage: "If you have any issues or questions, contact us at:",
    settingsPortalError: "We couldn't open your plan management. If the problem persists, write to us at atencionalcoientem@gmail.com.",
    settingsLogout: "Log out",
    settingsCancelSubscription: "Cancel subscription",
    settingsHotmartCancelTitle: "Cancel your subscription",
    settingsHotmartStep1: "1. Log in to your Hotmart buyer area with the email and password you used to purchase:",
    settingsHotmartStep1Link: "Go to Hotmart",
    settingsHotmartStep2: "2. Find your active CosmiCall subscription in your purchases section.",
    settingsHotmartStep3: "3. Select it and choose the cancel subscription option. It's a simple process you can do yourself.",
    settingsHotmartCancelFallback: "If you can't do it yourself, write to us at:",
    settingsChangePlanTitle: "Change plan",
    settingsChangePlanMessage: "To change your plan we need to do it from Hotmart on our end. Write to us telling us which plan you'd like to switch to at:",
    settingsHotmartClose: "Got it",

    appHeaderBrand: "Cosmicall",
    appAdminButton: "⚙️ Access",
    appMyChartButton: "My Chart ✨",
    appSettingsAria: "Settings",
    appProfileModalTitle: "Astral Profile",
    appSaveErrorTitle: "Couldn't save to the cloud",
    appSaveErrorDesc: "Your chart was calculated fine, but saving failed. Copy this message to review it:",
    appCopyError: "📋 Copy error",
    appContinue: "Continue →",
    appCalculatingChart: "Calculating your natal chart with precise astronomical data…",
    appSavingProfile: "Saving your profile…",
    appCalcError: "⚠ Error calculating the chart: {error}. Check your connection and try again.",
    appActivateChart: "Activate your natal chart",
    appActivateChartDesc: "For personalized readings",
    appNatalChartTitle: "🌌 Your Natal Chart",
    appNatalChartCardTitle: "Personalized Natal Chart",
    appNatalChartCardDesc: "Enter your date, time, and place of birth to calculate your real natal chart with all 10 planets, 12 houses, Lilith, and all aspects.",
    appCalculateChart: "Calculate my Chart ✨",
    appEdit: "Edit",
    appNavInicio: "Home",
    appNavCarta: "Chart",
    appNavAmor: "Love",
    appNavTarot: "Tarot",
    appNavMas: "More",
    appTileTarotLabel: "Tarot",
    appTileTarotDesc: "3-card reading",
    appTileMoreLabel: "See more",
    appTileMoreDesc: "Moon, events, signs",

    masSubLuna: "🌙 Moon",
    masSubEventos: "📅 Events",
    masSubPlanetas: "🪐 Planets",
    masSubSignos: "♈ Signs",
    masPlanetPositionsTitle: "TODAY'S PLANETARY POSITIONS",

    signosListHint: "Tap any sign to see its full characteristics, ruling planet, strengths, and compatibilities.",
    signDetailBack: "← Back to all signs",
    signDetailElement: "ELEMENT",
    signDetailRulerPlanet: "RULING PLANET",
    signDetailColor: "COLOR",
    signDetailModality: "MODALITY",
    signDetailWhyTitle: "WHY {ruler}?",
    signDetailWhyBody: "{sign} is ruled by {ruler}, {rulerWhy}. That's why this energy shapes so much of its way of being.",
    signDetailTraitsTitle: "MAIN TRAITS",
    signDetailStrengths: "💪 STRENGTHS",
    signDetailChallenges: "⚡ CHALLENGES",
    signDetailLoveStyle: "💕 HOW {sign} LOVES",
    signDetailCompatible: "✨ MOST COMPATIBLE WITH",

    amorTitle: "Love & Compatibility",
    amorSubtitle: "Choose how you want to explore compatibility. Start with the first option if you're not sure.",
    amorStartHere: "START HERE",
    amorOption1Title: "Compatibility by Sign",
    amorOption1Desc: "Choose this option if you only know the zodiac sign of both people (e.g. Taurus and Leo). No exact date or time needed. It's the fastest.",
    amorOption2Title: "Deep Compatibility (with your own chart)",
    amorOption2Desc: "Choose this option if you want to know which signs are compatible with you in general — for marriage, romance, intimacy, etc. Only your natal chart is needed, not anyone else's.",
    amorOption2Warn: "⚠ You need to activate your natal chart first (\"My Chart\" button above)",
    amorOption3Title: "Compatibility with Another Person",
    amorOption3Desc: "Choose this option if you want to compare your chart with someone specific (your partner, a crush, etc). You need to know their date AND time of birth. It's the most complete analysis there is.",
    amorOption3Warn: "⚠ You need to activate your natal chart first",
    amorBack: "← Back",
    amorBySignTitle: "By Sun Sign",
    amorYourSign: "Your sign:",
    amorYourSignSelected: "Your sign is selected. Now choose the other person's:",
    amorYourNatalSign: "your natal sign",
    amorChange: "change",
    amorNeedChartFirst: "First you need your natal chart. Go to \"My Chart ✨\" above.",
    amorOtherPersonTitle: "Compatibility with Another Person",
    amorLoadingSaved: "Loading saved people…",
    amorSavedPeople: "Your saved people:",
    amorAddNewPerson: "➕ Add New Person",
    amorEditPerson: "Edit Person",
    amorNewPerson: "New Person",
    amorWhoIsThisPerson: "Who is this person?",
    amorNameLabel: "NAME *",
    amorNamePlaceholder: "Their name",
    amorRelationLabel: "RELATIONSHIP *",
    amorRelPareja: "Partner",
    amorRelCrush: "Crush",
    amorRelAmistad: "Friend",
    amorRelFamilia: "Family",
    amorRelEx: "Ex",
    amorRelOtro: "Other",
    amorDateOf: "Date and time of {name}",
    amorCityOf: "City of birth of {name}",
    amorSaveCheckbox: "Save {name} so you don't have to enter their info again",
    amorThisPerson: "this person",
    amorContinue: "Continue →",
    amorSaveAndCalculate: "💾 Save Changes and Calculate",
    amorCalculateSynastry: "✨ Calculate Synastry",
    amorCalculatingSynastry: "Calculating the natal chart and synastry…",
    amorMayTakeSeconds: "This may take a few seconds",
    amorCouldNotCalculate: "Couldn't calculate",
    amorTryAgain: "Try again",
    amorResultTitle: "Result",
    amorNewQuery: "New query",
    amorCompatibilityLabel: "compatibility",
    amorYou: "You",
    amorHerHim: "Her/Him",
    amorSecQuimica: "Chemistry and Attraction",
    amorSecDesafio: "Challenges",
    amorSecPotencial: "Long-Term Potential",
    amorSecConsejo: "Advice for this Couple",
    amorCatLove: "Love",
    amorCatEmotional: "Emotional",
    amorCatCommunication: "Communication",
    amorCatTrust: "Trust",
    amorCatIntimacy: "Intimacy",
    amorKarmicTitle: "Karmic Connection",
    amorKarmicLevelAlta: "High",
    amorKarmicLevelMedia: "Medium",
    amorKarmicLevelBaja: "Low",
    amorKarmicNoHits: "No strong karmic points (Lilith/Nodes) detected between your charts. That's not good or bad — it's simply a lighter connection in that sense.",
    amorKarmicNeedChart: "Calculate the full synastry with this person's natal chart to see if there's a karmic connection (Black Moon and Lunar Nodes).",
    amorOption4Title: "My best matches",
    amorOption4Desc: "Compare your sun sign against all 12 zodiac signs and discover which ones you're most compatible with.",
    amorOption4Warn: "You need your natal chart or to pick your sign first.",
    topMatchesTitle: "Your Best Matches",
    topMatchesSubtitle: "Your sun sign's compatibility against all 12 zodiac signs",

    compatibleSignsTitle: "Your Compatible Signs",
    compatibleSignsSubtitle: "Based on your natal chart · Tap to see the analysis",
    compatibleSignsHintTitle: "💡 Each card shows the house number",
    compatibleSignsHintBody: "This data comes directly from your real natal chart (Placidus system) — the same calculation you see in \"My Natal Chart\". Each sign corresponds to the house indicated on its label.",
    compatibleSignsFooterNote: "💡 These are energetic archetypes, not prescriptions. What matters is the resonance, not just the sun sign.",
    compatibleSignsViewMore: "View ›",

    tarotTitle: "Tarot Reading",
    tarotFilterAmor: "Love",
    tarotFilterTrabajo: "Work",
    tarotFilterDinero: "Money",
    tarotFilterDecision: "Decision",
    tarotFilterMiCamino: "My path",
    tarotCenterMind: "Center your mind{intentSuffix} and press to reveal the cards.",
    tarotIntentSuffix: " on {intent}",
    tarotReveal3: "Reveal 3 Cards",
    tarotTapToReveal: "Tap to reveal",
    tarotNewDraw: "New Draw",
    tarotPast: "PAST",
    tarotPresent: "PRESENT",
    tarotFuture: "FUTURE",
    tarotQPast: "What did you leave behind?",
    tarotQPresent: "Where are you now?",
    tarotQFuture: "What's coming?",

    cartaAscendant: "Ascendant",
    cartaMidheaven: "Midheaven",
    cartaNorthNode: "North Node",
    cartaAscSub: "your social mask",
    cartaMcSub: "your vocation",
    cartaNnSub: "your purpose",
    cartaTabPlanetas: "Planets",
    cartaTabCasas: "Houses",
    cartaTabAspectos: "Aspects",
    cartaTabTransitos: "Transits",
    cartaNoAspects: "No major aspects active",
    cartaNoTransits: "No active transits right now",
    cartaTodaySkyPositions: "TODAY'S SKY POSITIONS",
    cartaExact: "Exact",
    cartaHarmonious: "Harmonious",
    cartaTension: "Tension",
    cartaMajor: "Major",
    cartaHouse: "House {n}",
    cartaLilithTitle: "Lilith (Black Moon)",

    biorhythmTitle: "My Biorhythm",
    biorhythmDesc: "Natural energy cycles calculated from your birth date — when you perform best and when it's best to slow down.",
    biorhythmFisico: "Physical",
    biorhythmEmocional: "Emotional",
    biorhythmMental: "Mental",
    biorhythmToday: "TODAY",
    biorhythmYesterday: "Yesterday",
    biorhythmTodayLabel: "Today",

    lunarTipsTitle: "PRACTICAL TIPS — {moon}",
    astroEventsTitle: "UPCOMING ASTROLOGICAL EVENTS",
    moonPhasesTitle: "PHASES OF THE MONTH",

    oracleAdvice: "Advice of the Day",
    oracleGreeting: "Hi, {name}",
    oracleSectionEnergia: "General Energy",
    oracleSectionAmor: "Love and Relationships",
    oracleSectionTrabajo: "Work and Money",
    interAspectsTitle: "INTER-CHART ASPECTS ({count} found)",

    langToggleLabel: "Language",
  },
};

const LanguageContext = createContext({ language: "es", setLanguage: () => {} });

// ── Display-only translation maps for sign/moon-phase names ──
// IMPORTANT: these are ONLY for rendering visible text. All internal keys,
// comparisons, and lookups (chart.planets.Sol.sign, ELEM[...], ORACLE_TEXTS[...],
// COMPAT_MATRIX, SIGNS_LIST entries, getMoonPhase() phase.name, etc.) must keep
// using the original Spanish strings exactly as before.
const SIGN_NAME_EN = { Aries: "Aries", Tauro: "Taurus", Géminis: "Gemini", Cáncer: "Cancer", Leo: "Leo", Virgo: "Virgo", Libra: "Libra", Escorpio: "Scorpio", Sagitario: "Sagittarius", Capricornio: "Capricorn", Acuario: "Aquarius", Piscis: "Pisces" };
const MOON_PHASE_NAME_EN = { "Luna Nueva": "New Moon", "Creciente": "Waxing Crescent", "Cuarto Creciente": "First Quarter", "Gibosa Creciente": "Waxing Gibbous", "Gibosa": "Waxing Gibbous", "Luna Llena": "Full Moon", "Gibosa Menguante": "Waning Gibbous", "Gibosa Men.": "Waning Gibbous", "Cuarto Menguante": "Last Quarter", "Menguante": "Waning Crescent" };
const MOON_ENERGY_EN = { "Siembra intenciones": "Plant intentions", "Toma acción": "Take action", "Decisión y compromiso": "Decision and commitment", "Refinamiento": "Refinement", "Culminación y revelación": "Culmination and revelation", "Gratitud y compartir": "Gratitude and sharing", "Soltar y perdonar": "Letting go and forgiving", "Descanso y reflexión": "Rest and reflection" };

function signLabel(name, language) { return language === "en" ? (SIGN_NAME_EN[name] || name) : name; }
function moonPhaseLabel(name, language) { return language === "en" ? (MOON_PHASE_NAME_EN[name] || name) : name; }
function moonEnergyLabel(text, language) { return language === "en" ? (MOON_ENERGY_EN[text] || text) : text; }

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}

function useLanguage() {
  const { language, setLanguage } = useContext(LanguageContext);
  function t(key, vars) {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.es;
    const str = dict[key] ?? TRANSLATIONS.es[key] ?? key;
    return interpolate(str, vars);
  }
  return { t, language, setLanguage };
}

function LanguageToggle({ style = {} }) {
  const { language, setLanguage } = useLanguage();
  function flip() {
    const next = language === "es" ? "en" : "es";
    setLanguage(next);
    try { localStorage.setItem("cosmicall_lang", next); } catch {}
  }
  return (
    <button
      onClick={flip}
      aria-label="ES/EN"
      style={{
        background: "none", border: "1px solid #2e1f5e", borderRadius: 20,
        padding: "4px 10px", color: "#9080b0", fontSize: 11, fontWeight: 700,
        cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5,
        ...style,
      }}
    >
      {language === "es" ? "ES" : "EN"} ⇄
    </button>
  );
}

// ── SUPABASE CONFIG ──────────────────────────────────────
const SUPABASE_URL = "https://sgcwzazrsuhydkfzpjce.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnY3d6YXpyc3VoeWRrZnpwamNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTIzMDgsImV4cCI6MjA5NzM4ODMwOH0.4sh3Slfm_XihDo5uiTYaFSFi5z7vfPnbY5xB94ZthS0";
const ADMIN_EMAIL = "nataliabayonamus@gmail.com";

const sb = {
  headers: {
    "Content-Type": "application/json",
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
  },
  async getAccesos() {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/accesos?select=*&order=created_at.desc`, { headers: this.headers });
    return r.json();
  },
  async checkAcceso(email) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/accesos?email=eq.${encodeURIComponent(email.toLowerCase())}&activo=eq.true&select=email`, { headers: this.headers });
    const data = await r.json();
    return Array.isArray(data) && data.length > 0;
  },
  async addAcceso(email, nombre) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/accesos`, {
      method: "POST",
      headers: { ...this.headers, "Prefer": "return=representation" },
      body: JSON.stringify({ email: email.toLowerCase().trim(), nombre: nombre.trim(), activo: true }),
    });
    return r.json();
  },
  async toggleAcceso(email, activo) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/accesos?email=eq.${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers: { ...this.headers, "Prefer": "return=representation" },
      body: JSON.stringify({ activo }),
    });
    return r.json();
  },
  async deleteAcceso(email) {
    await fetch(`${SUPABASE_URL}/rest/v1/accesos?email=eq.${encodeURIComponent(email)}`, {
      method: "DELETE",
      headers: this.headers,
    });
  },

  // ── PERFILES (carta natal de cada usuario, ligada a su email) ──
  async getPerfil(email) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/perfiles?email=eq.${encodeURIComponent(email.toLowerCase())}&select=*&limit=1`, { headers: this.headers });
    const data = await r.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  },
  async savePerfil(email, perfil) {
    const existing = await this.getPerfil(email);
    const payload = {
      email: email.toLowerCase().trim(),
      nombre: perfil.name,
      genero: perfil.genero,
      avatar: perfil.avatar,
      birthdate: perfil.birthdate,
      birthtime: perfil.birthtime,
      city: perfil.city,
      lat: perfil.lat,
      lon: perfil.lon,
    };
    let r;
    if (existing) {
      r = await fetch(`${SUPABASE_URL}/rest/v1/perfiles?email=eq.${encodeURIComponent(email.toLowerCase())}`, {
        method: "PATCH",
        headers: { ...this.headers, "Prefer": "return=representation" },
        body: JSON.stringify(payload),
      });
    } else {
      r = await fetch(`${SUPABASE_URL}/rest/v1/perfiles`, {
        method: "POST",
        headers: { ...this.headers, "Prefer": "return=representation" },
        body: JSON.stringify(payload),
      });
    }
    if (!r.ok) {
      const errText = await r.text();
      throw new Error(`Supabase ${r.status}: ${errText}`);
    }
    return r.json();
  },

  // ── PERSONAS GUARDADAS (para compatibilidad, ligadas al email del dueño) ──
  async getPersonas(ownerEmail) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/personas_guardadas?owner_email=eq.${encodeURIComponent(ownerEmail.toLowerCase())}&select=*&order=nombre.asc`, { headers: this.headers });
    const data = await r.json();
    return Array.isArray(data) ? data : [];
  },
  async addPersona(ownerEmail, persona) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/personas_guardadas`, {
      method: "POST",
      headers: { ...this.headers, "Prefer": "return=representation" },
      body: JSON.stringify({
        owner_email: ownerEmail.toLowerCase().trim(),
        nombre: persona.nombre,
        relacion: persona.relacion,
        birthdate: persona.birthdate,
        birthtime: persona.birthtime,
        city: persona.city,
        lat: persona.lat,
        lon: persona.lon,
      }),
    });
    return r.json();
  },
  async updatePersona(id, persona) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/personas_guardadas?id=eq.${id}`, {
      method: "PATCH",
      headers: { ...this.headers, "Prefer": "return=representation" },
      body: JSON.stringify({
        nombre: persona.nombre,
        relacion: persona.relacion,
        birthdate: persona.birthdate,
        birthtime: persona.birthtime,
        city: persona.city,
        lat: persona.lat,
        lon: persona.lon,
      }),
    });
    if (!r.ok) {
      const errText = await r.text();
      throw new Error(`Supabase ${r.status}: ${errText}`);
    }
    return r.json();
  },
  // Guarda o actualiza: si ya existe una persona con ese nombre para este dueño, la actualiza
  // en vez de crear un duplicado.
  async upsertPersona(ownerEmail, persona) {
    const existing = await this.getPersonas(ownerEmail);
    const match = existing.find(p => p.nombre.trim().toLowerCase() === persona.nombre.trim().toLowerCase());
    if (match) {
      return await this.updatePersona(match.id, persona);
    }
    return await this.addPersona(ownerEmail, persona);
  },
  async deletePersona(id) {
    await fetch(`${SUPABASE_URL}/rest/v1/personas_guardadas?id=eq.${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  },

};

// ── ACCESS GATE + LOGIN ──────────────────────────────────
const C_ACCESS = {
  bg: "#0d0820", card: "#1e1240", border: "#2e1f5e",
  gold: "#f0c040", goldDim: "#c8980a", violet: "#9b6dff",
  white: "#f8f4ff", muted: "#9080b0", success: "#30d080",
  danger: "#e04060", warn: "#f0a030",
};

function LoginGate({ onLogin }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("email"); // email | checking

  async function handleSubmit() {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError(t("loginInvalidEmail"));
      return;
    }
    setLoading(true);
    setError("");
    setStep("checking");
    try {
      // Admin always has access
      if (trimmed === ADMIN_EMAIL) {
        onLogin(trimmed, true);
        return;
      }
      const hasAccess = await sb.checkAcceso(trimmed);
      if (hasAccess) {
        onLogin(trimmed, false);
      } else {
        setError(t("loginNoAccess"));
        setStep("email");
      }
    } catch {
      setError(t("loginConnError"));
      setStep("email");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: C_ACCESS.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <LanguageToggle />
        </div>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C_ACCESS.gold, margin: "0 0 6px", letterSpacing: -0.5 }}>{t("loginTitleApp")}</h1>
          <p style={{ color: C_ACCESS.muted, fontSize: 14, margin: 0 }}>{t("loginSubtitle")}</p>
        </div>

        {/* Card */}
        <div style={{ background: C_ACCESS.card, border: `1px solid ${C_ACCESS.border}`, borderRadius: 20, padding: 28 }}>
          {step === "checking" ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🔭</div>
              <p style={{ color: C_ACCESS.muted, fontSize: 14 }}>{t("loginVerifying")}</p>
            </div>
          ) : (
            <>
              <h2 style={{ color: C_ACCESS.white, fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>{t("loginCardTitle")}</h2>
              <p style={{ color: C_ACCESS.muted, fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>
                {t("loginCardDesc")}
              </p>

              <label style={{ fontSize: 11, color: C_ACCESS.muted, fontWeight: 600, display: "block", marginBottom: 6, letterSpacing: 0.5 }}>
                {t("loginEmailLabel")}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder={t("loginEmailPlaceholder")}
                autoFocus
                style={{
                  width: "100%", background: "#0a0518", border: `1px solid ${error ? C_ACCESS.danger : C_ACCESS.border}`,
                  borderRadius: 12, padding: "12px 14px", color: C_ACCESS.white, fontSize: 14,
                  fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: error ? 8 : 16,
                }}
              />

              {error && (
                <div style={{ background: `${C_ACCESS.danger}15`, border: `1px solid ${C_ACCESS.danger}44`, borderRadius: 10, padding: "10px 12px", marginBottom: 16 }}>
                  <p style={{ color: C_ACCESS.danger, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || !email.trim()}
                style={{
                  width: "100%", background: loading || !email.trim() ? "#2e1f5e" : C_ACCESS.gold,
                  color: loading || !email.trim() ? C_ACCESS.muted : "#1a0d00",
                  border: "none", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 700,
                  cursor: loading || !email.trim() ? "not-allowed" : "pointer", fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
              >
                {loading ? t("loginButtonVerifying") : t("loginButtonEnter")}
              </button>
            </>
          )}
        </div>

        <p style={{ textAlign: "center", color: C_ACCESS.muted, fontSize: 11, marginTop: 16, lineHeight: 1.6 }}>
          {t("loginNoAccessFooter")}<br />
          <span style={{ color: C_ACCESS.gold }}>atencionalcoientem@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ──────────────────────────────────────────
function AdminPanel({ onClose }) {
  const { t } = useLanguage();
  const [accesos, setAccesos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [newNombre, setNewNombre] = useState("");
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => { loadAccesos(); }, []);

  async function loadAccesos() {
    setLoading(true);
    try {
      const data = await sb.getAccesos();
      setAccesos(Array.isArray(data) ? data : []);
    } catch { setAccesos([]); }
    setLoading(false);
  }

  async function addAcceso() {
    if (!newEmail.trim() || !newEmail.includes("@")) {
      setMsg(t("adminInvalidEmail")); return;
    }
    setAdding(true); setMsg("");
    try {
      await sb.addAcceso(newEmail, newNombre || newEmail.split("@")[0]);
      setMsg(t("adminAccessGranted"));
      setNewEmail(""); setNewNombre("");
      await loadAccesos();
    } catch { setMsg(t("adminAddError")); }
    setAdding(false);
  }

  async function toggle(email, currentActivo) {
    await sb.toggleAcceso(email, !currentActivo);
    await loadAccesos();
  }

  async function remove(email) {
    if (!window.confirm(t("adminRemoveConfirm", { email }))) return;
    await sb.deleteAcceso(email);
    await loadAccesos();
  }

  const filtered = accesos.filter(a =>
    a.email?.toLowerCase().includes(search.toLowerCase()) ||
    a.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  const inp = {
    background: "#0a0518", border: `1px solid #2e1f5e`, borderRadius: 10,
    padding: "10px 12px", color: "#f8f4ff", fontSize: 13, fontFamily: "inherit",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, overflowY: "auto", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", minHeight: "100vh", background: "#0d0820" }}>
        {/* Header */}
        <div style={{ background: "#160d30", borderBottom: `1px solid #2e1f5e`, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#f0c040" }}>{t("adminPanelTitle")}</div>
            <div style={{ fontSize: 11, color: "#9080b0", marginTop: 2 }}>{t("adminActiveTotal", { active: accesos.filter(a => a.activo).length, total: accesos.length })}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#9080b0", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>

        <div style={{ padding: 16 }}>
          {/* Agregar nuevo */}
          <div style={{ background: "#1e1240", border: `1px solid #2e1f5e`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0c040", marginBottom: 12 }}>{t("adminAddNew")}</div>
            <input value={newNombre} onChange={e => setNewNombre(e.target.value)} placeholder={t("adminNamePlaceholder")} style={{ ...inp, width: "100%", marginBottom: 8 }} />
            <input type="email" value={newEmail} onChange={e => { setNewEmail(e.target.value); setMsg(""); }} onKeyDown={e => e.key === "Enter" && addAcceso()} placeholder={t("adminEmailPlaceholder")} style={{ ...inp, width: "100%", marginBottom: 10 }} />
            {msg && <p style={{ fontSize: 12, color: msg.startsWith("✅") ? "#30d080" : "#e04060", margin: "0 0 10px" }}>{msg}</p>}
            <button onClick={addAcceso} disabled={adding || !newEmail.trim()} style={{ width: "100%", background: adding || !newEmail.trim() ? "#2e1f5e" : "#f0c040", color: adding || !newEmail.trim() ? "#9080b0" : "#1a0d00", border: "none", borderRadius: 10, padding: "11px", fontSize: 14, fontWeight: 700, cursor: adding || !newEmail.trim() ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
              {adding ? t("adminSaving") : t("adminGiveAccess")}
            </button>
          </div>

          {/* Buscador */}
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("adminSearchPlaceholder")} style={{ ...inp, width: "100%", marginBottom: 12 }} />

          {/* Lista */}
          {loading ? (
            <div style={{ textAlign: "center", padding: 32 }}><p style={{ color: "#9080b0" }}>{t("adminLoading")}</p></div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32 }}><p style={{ color: "#9080b0" }}>{search ? t("adminNoResults") : t("adminNoAccesses")}</p></div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.map((a, i) => (
                <div key={i} style={{ background: "#1e1240", border: `1px solid ${a.activo ? "#2e1f5e" : "#e0406033"}`, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: a.activo ? "#30d08020" : "#e0406020", border: `1px solid ${a.activo ? "#30d08044" : "#e0406044"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                    {a.activo ? "✓" : "✗"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f8f4ff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.nombre || t("adminNoName")}</div>
                    <div style={{ fontSize: 11, color: "#9080b0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.email}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => toggle(a.email, a.activo)} style={{ background: a.activo ? "#e0406020" : "#30d08020", border: `1px solid ${a.activo ? "#e0406044" : "#30d08044"}`, borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, color: a.activo ? "#e04060" : "#30d080", cursor: "pointer", fontFamily: "inherit" }}>
                      {a.activo ? t("adminPause") : t("adminActivate")}
                    </button>
                    <button onClick={() => remove(a.email)} style={{ background: "#e0406015", border: `1px solid #e0406033`, borderRadius: 8, padding: "5px 8px", fontSize: 11, color: "#e04060", cursor: "pointer", fontFamily: "inherit" }}>
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ── PALETA ──────────────────────────────────────────────
const C = {
  bg:"#0d0820",bgMid:"#160d30",bgCard:"#1e1240",bgDeep:"#0a0518",
  border:"#2e1f5e",gold:"#f0c040",goldDim:"#c8980a",
  violet:"#9b6dff",violetDim:"#6a40d0",pink:"#e056a0",teal:"#30d0b0",cyan:"#40c8f0",
  white:"#f8f4ff",muted:"#9080b0",mutedDark:"#4a3870",
  success:"#30d080",danger:"#e04060",warn:"#f0a030",
};

// ── MOTOR ASTRONÓMICO (matemáticas puras, sin dependencias externas) ──
// Validado contra circular-natal-horoscope-js: coincide en Sol, Luna, ASC, MC, Lilith, Nodo Norte

const SIGNS_AST=["Aries","Tauro","Géminis","Cáncer","Leo","Virgo","Libra","Escorpio","Sagitario","Capricornio","Acuario","Piscis"];
const SIGN_GLYPHS=["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
const PLANET_SYMBOLS={Sol:"☀️",Luna:"🌙",Mercurio:"☿",Venus:"♀",Marte:"♂",Júpiter:"♃",Saturno:"♄",Urano:"♅",Neptuno:"♆",Plutón:"♇"};

function norm(a){return((a%360)+360)%360;}
function rad(d){return d*Math.PI/180;}
function signOf(lon){return SIGNS_AST[Math.floor(norm(lon)/30)];}
function signIndex(lon){return Math.floor(norm(lon)/30);}
function degInSign(lon){return(norm(lon)%30).toFixed(1);}

function toJD(Y,M,D,h,mi){
  const dayFrac = D + h/24 + mi/1440;
  const A=Math.floor(Y/100), B=2-A+Math.floor(A/4);
  let Y2=Y,M2=M;
  if(M<=2){Y2=Y-1;M2=M+12;}
  return Math.floor(365.25*(Y2+4716))+Math.floor(30.6001*(M2+1))+dayFrac+B-1524.5;
}
function toT(jd){return(jd-2451545.0)/36525;}

function sunLon(T){const L0=norm(280.46646+36000.76983*T),M=norm(357.52911+35999.05029*T-0.0001537*T*T),Mr=rad(M),C=(1.914602-0.004817*T-0.000014*T*T)*Math.sin(Mr)+(0.019993-0.000101*T)*Math.sin(2*Mr)+0.000289*Math.sin(3*Mr);return norm(L0+C-0.00569-0.00478*Math.sin(rad(125.04-1934.136*T)));}
function moonLon(T){const L=norm(218.3165+481267.8813*T),M=norm(357.5291+35999.0503*T),Mp=norm(134.9634+477198.8676*T),D=norm(297.8502+445267.1115*T),F=norm(93.2720+483202.0175*T);return norm(L+6.2888*Math.sin(rad(Mp))+1.2740*Math.sin(rad(2*D-Mp))+0.6583*Math.sin(rad(2*D))+0.2136*Math.sin(rad(2*Mp))-0.1851*Math.sin(rad(M))-0.1143*Math.sin(rad(2*F))+0.0588*Math.sin(rad(2*D-2*Mp))+0.0572*Math.sin(rad(2*D-M-Mp))+0.0533*Math.sin(rad(2*D+Mp)));}
function mercuryLon(T){const L=norm(252.2509+149472.6746*T),M=norm(357.5291+35999.0503*T),Mm=norm(319.5096+58517.8159*T);return norm(L+23.4405*Math.sin(rad(Mm))+2.9818*Math.sin(rad(2*Mm))+0.5255*Math.sin(rad(3*Mm))-2.2764*Math.sin(rad(M))+0.5025*Math.sin(rad(M+Mm))+0.1813*Math.sin(rad(M-Mm)));}
function venusLon(T){const L=norm(181.9798+58517.8159*T),M=norm(212.9468+58517.8038*T);return norm(L+0.7758*Math.sin(rad(M))+0.0033*Math.sin(rad(2*M)));}
function marsLon(T){const L=norm(355.4332+19140.2993*T),M=norm(319.5096+19139.8564*T);return norm(L+10.6912*Math.sin(rad(M))+0.6228*Math.sin(rad(2*M))+0.0503*Math.sin(rad(3*M)));}
function jupiterLon(T){const L=norm(34.3515+3034.9057*T),M=norm(20.9202+3034.7748*T);return norm(L+5.5549*Math.sin(rad(M))+0.1683*Math.sin(rad(2*M)));}
function saturnLon(T){const L=norm(50.0775+1222.1138*T),M=norm(317.9281+1221.5515*T);return norm(L+6.3585*Math.sin(rad(M))-0.2204*Math.sin(rad(2*M)));}
function uranusLon(T){const L=norm(314.0550+428.4677*T),M=norm(142.5905+428.4669*T);return norm(L+5.3042*Math.sin(rad(M))+0.1534*Math.sin(rad(2*M)));}
function neptuneLon(T){const L=norm(304.3487+218.4662*T),M=norm(260.2471+218.4611*T);return norm(L+1.0534*Math.sin(rad(M)));}
function plutoLon(T){return norm(238.9508+144.9600*T);}
function obliquity(T){return 23.439291111-0.013004167*T-0.000000164*T*T;}
function northNodeLon(T){return norm(125.0445-1934.1362*T);}
function lilithLon(jd){return norm(280.4065+0.1114041*(jd-2451545.0));}
function GMST(jd){const T_=(jd-2451545.0)/36525;return norm(280.46061837+360.98564736629*(jd-2451545)+0.000387933*T_*T_);}

function calcAscendant(lst,latDeg,oblDeg){
  const theta=rad(lst),phi=rad(latDeg),E=rad(oblDeg);
  const tanL=-Math.cos(theta)/(Math.sin(theta)*Math.cos(E)+Math.tan(phi)*Math.sin(E));
  let l=Math.atan(tanL)*180/Math.PI;
  const target=norm(lst+90);
  let best=l;
  for(const o of[0,180,-180,360,-360]) if(Math.abs(l+o-target)<Math.abs(best-target)) best=l+o;
  return norm(best);
}
function calcMC(lst,oblDeg){
  const R=rad(lst),E=rad(oblDeg);
  let mc=Math.atan2(Math.tan(R),Math.cos(E))*180/Math.PI;
  if(Math.cos(R)<0) mc+=180;
  return norm(mc);
}
// Equal-house system from Ascendant (clean, no size inconsistencies)
function calcHouses(asc){const c=[];for(let i=0;i<12;i++)c.push(norm(asc+i*30));return c;}
function houseOf(lon,cusps){for(let i=0;i<12;i++){const s=cusps[i],e=cusps[(i+1)%12],sp=norm(e-s)||30;if(norm(lon-s)<sp)return i+1;}return 1;}

const ASPECT_DEFS=[{name:"Conjunción",angle:0,orb:8,symbol:"☌",type:"major"},{name:"Sextil",angle:60,orb:6,symbol:"⚹",type:"harmonious"},{name:"Cuadratura",angle:90,orb:8,symbol:"□",type:"tension"},{name:"Trígono",angle:120,orb:8,symbol:"△",type:"harmonious"},{name:"Oposición",angle:180,orb:8,symbol:"☍",type:"major"}];
function findAspect(l1,l2){const d=norm(l1-l2),a=d>180?360-d:d;for(const asp of ASPECT_DEFS)if(Math.abs(a-asp.angle)<=asp.orb)return{...asp,exact:Math.abs(a-asp.angle).toFixed(1)};return null;}

// Approximate local UTC offset from longitude (15° per hour) — good enough without a TZ database
function approxUTCOffset(lonDeg){ return Math.round(lonDeg/15); }

// Equation of Time (minutes): difference between true solar time and mean (civil) solar time.
// Professional astrology software (Placidus-based) corrects the Ascendant/MC calculation using
// true solar time, not mean time — this matters because civil clocks run on mean time but the
// sky's actual position follows true solar time, which can differ by up to ~16 minutes.
function equationOfTimeMinutes(T){
  const L0 = norm(280.46646+36000.76983*T);
  const M  = norm(357.52911+35999.05029*T);
  const e  = 0.016708634 - 0.000042037*T;
  const eps0 = 23.439291 - 0.0130042*T;
  const y = Math.pow(Math.tan(rad(eps0)/2), 2);
  const Mr = rad(M), L0r = rad(L0);
  const EoT = y*Math.sin(2*L0r) - 2*e*Math.sin(Mr) + 4*e*y*Math.sin(Mr)*Math.cos(2*L0r)
            - 0.5*y*y*Math.sin(4*L0r) - 1.25*e*e*Math.sin(2*Mr);
  return EoT * 4 * 180 / Math.PI; // radians of L0 -> minutes (4 min per degree)
}

// ── FREEASTROAPI INTEGRATION (Placidus real, profesional) ──
const FREEASTRO_KEY = "509b01e3ed99feb98de959688a3a5562723fbbdc56e2f72623f21a8b19ef999b";
const FREEASTRO_URL = "https://api.freeastroapi.com/api/v1/natal/calculate";

const SIGN_ABBR_TO_FULL = {
  Ari:"Aries", Tau:"Tauro", Gem:"Géminis", Can:"Cáncer", Leo:"Leo", Vir:"Virgo",
  Lib:"Libra", Sco:"Escorpio", Sag:"Sagitario", Cap:"Capricornio", Aqu:"Acuario", Pis:"Piscis",
};
const PLANET_API_TO_ES = {
  sun:"Sol", moon:"Luna", mercury:"Mercurio", venus:"Venus", mars:"Marte",
  jupiter:"Júpiter", saturn:"Saturno", uranus:"Urano", neptune:"Neptuno", pluto:"Plutón",
};
const ASPECT_API_TO_ES = {
  Conjunction:{name:"Conjunción",symbol:"☌",type:"major"},
  Sextile:{name:"Sextil",symbol:"⚹",type:"harmonious"},
  Square:{name:"Cuadratura",symbol:"□",type:"tension"},
  Trine:{name:"Trígono",symbol:"△",type:"harmonious"},
  Opposition:{name:"Oposición",symbol:"☍",type:"major"},
};

// Llama a FreeAstroAPI y transforma la respuesta al formato interno que usa el resto de la app.
async function fetchNatalChart(birthdate, birthtime, latDeg, lonDeg, cityLabel) {
  const [y, mo, d] = birthdate.split("-").map(Number);
  const [h, mi] = birthtime.split(":").map(Number);

  const res = await fetch(FREEASTRO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": FREEASTRO_KEY },
    body: JSON.stringify({
      year: y, month: mo, day: d,
      time_known: true, hour: h, minute: mi,
      city: cityLabel || "Bogota, Colombia",
      lat: latDeg, lng: lonDeg,
      tz_str: "AUTO",
      house_system: "placidus",
      zodiac_type: "tropical",
      include_features: ["lilith", "true_node"],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`FreeAstroAPI ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return transformApiResponse(data);
}

function transformApiResponse(data) {
  const planetData = {};
  for (const p of data.planets) {
    const nameEs = PLANET_API_TO_ES[p.id];
    if (!nameEs) continue; // skip chiron etc, not used in our UI
    planetData[nameEs] = {
      lon: p.abs_pos,
      sign: SIGN_ABBR_TO_FULL[p.sign] || p.sign,
      signIdx: SIGNS_AST.indexOf(SIGN_ABBR_TO_FULL[p.sign] || p.sign),
      deg: p.pos.toFixed(1),
      house: p.house,
    };
  }

  const asc = data.angles.asc;
  const mc = data.angles.mc;

  // Confiar exclusivamente en el array "houses" que devuelve la API — esta es la fuente
  // real de Placidus (igual que astro.com), sin forzar relaciones angulares simplificadas.
  const cusps = new Array(12).fill(0);
  for (const hse of data.houses) {
    cusps[hse.house - 1] = hse.abs_pos;
  }

  // Lilith and North Node come back in the planets array too (as extra features)
  const lilithP = data.planets.find(p => p.id === "lilith" || p.id === "mean_lilith" || p.id === "black_moon_lilith");
  const nnP = data.planets.find(p => p.id === "true_node" || p.id === "north_node" || p.id === "mean_node");

  const lilithLon_ = lilithP ? lilithP.abs_pos : 0;
  const nnLon_ = nnP ? nnP.abs_pos : 0;

  // Aspects: map from API format to internal format, only between the 10 main planets
  const aspects = [];
  if (data.aspects) {
    for (const a of data.aspects) {
      const p1 = PLANET_API_TO_ES[a.p1?.toLowerCase()];
      const p2 = PLANET_API_TO_ES[a.p2?.toLowerCase()];
      const aspMeta = ASPECT_API_TO_ES[a.type];
      if (p1 && p2 && aspMeta) {
        aspects.push({ p1, p2, name: aspMeta.name, symbol: aspMeta.symbol, type: aspMeta.type, exact: Math.abs(a.orb).toFixed(1) });
      }
    }
  }

  return {
    planets: planetData,
    asc, ascSign: signOf(asc), ascDeg: degInSign(asc),
    mc, mcSign: signOf(mc), mcDeg: degInSign(mc),
    cusps, aspects,
    nn: nnLon_, nnSign: signOf(nnLon_),
    lilith: lilithLon_, lilithSign: signOf(lilithLon_),
    lilithHouse: lilithP ? lilithP.house : houseOf(lilithLon_, cusps),
    lilithDeg: lilithLon_ ? degInSign(lilithLon_) : "0.0",
  };
}

// calcChart ahora es ASYNC — debe usarse con await en todos los call sites
async function calcChart(birthdate, birthtime, latDeg, lonDeg, cityLabel){
  return await fetchNatalChart(birthdate, birthtime, latDeg, lonDeg, cityLabel);
}

function calcTransits(){
  const now = new Date();
  const T = toT(toJD(now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes()));
  return {
    Sol:sunLon(T), Luna:moonLon(T), Mercurio:mercuryLon(T), Venus:venusLon(T), Marte:marsLon(T),
    Júpiter:jupiterLon(T), Saturno:saturnLon(T), Urano:uranusLon(T), Neptuno:neptuneLon(T), Plutón:plutoLon(T),
  };
}

function findTransitAspects(chart, transits){
  const active=[];
  for(const[tN,tL]of Object.entries(transits)) for(const[nN,nD]of Object.entries(chart.planets)){
    const asp=findAspect(tL,nD.lon);
    if(asp&&asp.type!=="minor") active.push({transit:tN,natal:nN,transitSign:signOf(tL),transitDeg:degInSign(tL),...asp});
  }
  return active.sort((a,b)=>parseFloat(a.exact)-parseFloat(b.exact));
}

function getMoonPhase(){
  const now = new Date();
  const T = toT(toJD(now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes()));
  const diff = norm(moonLon(T) - sunLon(T));
  const phases=[{max:22.5,name:"Luna Nueva",emoji:"🌑",energy:"Siembra intenciones"},{max:67.5,name:"Creciente",emoji:"🌒",energy:"Toma acción"},{max:112.5,name:"Cuarto Creciente",emoji:"🌓",energy:"Decisión y compromiso"},{max:157.5,name:"Gibosa Creciente",emoji:"🌔",energy:"Refinamiento"},{max:202.5,name:"Luna Llena",emoji:"🌕",energy:"Culminación y revelación"},{max:247.5,name:"Gibosa Menguante",emoji:"🌖",energy:"Gratitud y compartir"},{max:292.5,name:"Cuarto Menguante",emoji:"🌗",energy:"Soltar y perdonar"},{max:360,name:"Menguante",emoji:"🌘",energy:"Descanso y reflexión"}];
  return phases.find(p=>diff<p.max)||phases[0];
}

// Standalone sun/moon longitude on a given date (noon, for moon-phase calendar)
function sunLonOnDate(date){const T=toT(toJD(date.getFullYear(),date.getMonth()+1,date.getDate(),12,0));return sunLon(T);}
function moonLonOnDate(date){const T=toT(toJD(date.getFullYear(),date.getMonth()+1,date.getDate(),12,0));return moonLon(T);}

// ── BASE DE CIUDADES ─────────────────────────────────────
const CITIES=[
  {n:"Bogotá",c:"Colombia",lat:4.711,lon:-74.072},{n:"Medellín",c:"Colombia",lat:6.244,lon:-75.581},{n:"Cali",c:"Colombia",lat:3.452,lon:-76.532},{n:"Barranquilla",c:"Colombia",lat:10.969,lon:-74.781},{n:"Cajicá",c:"Colombia",lat:4.919,lon:-74.027},{n:"Chía",c:"Colombia",lat:4.862,lon:-74.064},{n:"Bucaramanga",c:"Colombia",lat:7.119,lon:-73.123},{n:"Cartagena",c:"Colombia",lat:10.391,lon:-75.479},{n:"Ocaña",c:"Colombia",lat:8.236,lon:-73.359},{n:"Pereira",c:"Colombia",lat:4.813,lon:-75.696},{n:"Manizales",c:"Colombia",lat:5.070,lon:-75.514},{n:"Pasto",c:"Colombia",lat:1.214,lon:-77.281},{n:"Ibagué",c:"Colombia",lat:4.439,lon:-75.232},{n:"Cucuta",c:"Colombia",lat:7.894,lon:-72.508},{n:"Villavicencio",c:"Colombia",lat:4.142,lon:-73.627},{n:"Neiva",c:"Colombia",lat:2.927,lon:-75.282},{n:"Armenia",c:"Colombia",lat:4.534,lon:-75.681},{n:"Popayán",c:"Colombia",lat:2.445,lon:-76.615},{n:"Santa Marta",c:"Colombia",lat:11.241,lon:-74.199},{n:"Valledupar",c:"Colombia",lat:10.463,lon:-73.253},{n:"Tunja",c:"Colombia",lat:5.535,lon:-73.368},{n:"Soacha",c:"Colombia",lat:4.579,lon:-74.218},{n:"Zipaquirá",c:"Colombia",lat:5.023,lon:-74.006},{n:"Bello",c:"Colombia",lat:6.336,lon:-75.559},{n:"Palmira",c:"Colombia",lat:3.539,lon:-76.304},
  {n:"Mumbai",c:"India",lat:19.076,lon:72.878},{n:"Delhi",c:"India",lat:28.614,lon:77.209},{n:"New Delhi",c:"India",lat:28.614,lon:77.209},{n:"Bangalore",c:"India",lat:12.972,lon:77.595},{n:"Bengaluru",c:"India",lat:12.972,lon:77.595},{n:"Hyderabad",c:"India",lat:17.385,lon:78.487},{n:"Chennai",c:"India",lat:13.083,lon:80.271},{n:"Kolkata",c:"India",lat:22.573,lon:88.364},{n:"Ahmedabad",c:"India",lat:23.023,lon:72.571},{n:"Pune",c:"India",lat:18.520,lon:73.857},{n:"Jaipur",c:"India",lat:26.912,lon:75.787},{n:"Lucknow",c:"India",lat:26.847,lon:80.946},{n:"Surat",c:"India",lat:21.170,lon:72.831},{n:"Kanpur",c:"India",lat:26.450,lon:80.332},{n:"Nagpur",c:"India",lat:21.146,lon:79.088},{n:"Chandigarh",c:"India",lat:30.733,lon:76.779},{n:"Kochi",c:"India",lat:9.931,lon:76.267},{n:"Varanasi",c:"India",lat:25.318,lon:82.974},
  {n:"Ciudad de México",c:"México",lat:19.433,lon:-99.133},{n:"Mexico City",c:"México",lat:19.433,lon:-99.133},{n:"Guadalajara",c:"México",lat:20.660,lon:-103.350},{n:"Monterrey",c:"México",lat:25.687,lon:-100.316},{n:"Puebla",c:"México",lat:19.041,lon:-98.206},{n:"Tijuana",c:"México",lat:32.503,lon:-117.004},{n:"Cancún",c:"México",lat:21.162,lon:-86.852},{n:"Mérida",c:"México",lat:20.967,lon:-89.593},
  {n:"Buenos Aires",c:"Argentina",lat:-34.604,lon:-58.382},{n:"Córdoba",c:"Argentina",lat:-31.420,lon:-64.189},{n:"Rosario",c:"Argentina",lat:-32.944,lon:-60.651},{n:"Mendoza",c:"Argentina",lat:-32.891,lon:-68.827},{n:"Tucumán",c:"Argentina",lat:-26.824,lon:-65.223},{n:"Mar del Plata",c:"Argentina",lat:-38.002,lon:-57.558},
  {n:"Lima",c:"Perú",lat:-12.046,lon:-77.043},{n:"Arequipa",c:"Perú",lat:-16.409,lon:-71.538},{n:"Cusco",c:"Perú",lat:-13.532,lon:-71.968},
  {n:"Santiago",c:"Chile",lat:-33.449,lon:-70.669},{n:"Valparaíso",c:"Chile",lat:-33.047,lon:-71.613},
  {n:"Caracas",c:"Venezuela",lat:10.481,lon:-66.904},{n:"Maracaibo",c:"Venezuela",lat:10.667,lon:-71.612},
  {n:"Quito",c:"Ecuador",lat:-0.181,lon:-78.468},{n:"Guayaquil",c:"Ecuador",lat:-2.196,lon:-79.886},
  {n:"Asunción",c:"Paraguay",lat:-25.287,lon:-57.647},{n:"Montevideo",c:"Uruguay",lat:-34.901,lon:-56.165},{n:"La Paz",c:"Bolivia",lat:-16.500,lon:-68.150},{n:"Santa Cruz",c:"Bolivia",lat:-17.783,lon:-63.183},
  {n:"São Paulo",c:"Brasil",lat:-23.551,lon:-46.633},{n:"Rio de Janeiro",c:"Brasil",lat:-22.907,lon:-43.173},{n:"Brasília",c:"Brasil",lat:-15.780,lon:-47.929},{n:"Salvador",c:"Brasil",lat:-12.971,lon:-38.501},{n:"Fortaleza",c:"Brasil",lat:-3.717,lon:-38.543},{n:"Manaus",c:"Brasil",lat:-3.119,lon:-60.022},{n:"Belo Horizonte",c:"Brasil",lat:-19.919,lon:-43.939},{n:"Curitiba",c:"Brasil",lat:-25.429,lon:-49.267},{n:"Porto Alegre",c:"Brasil",lat:-30.035,lon:-51.218},{n:"Recife",c:"Brasil",lat:-8.048,lon:-34.877},
  {n:"Madrid",c:"España",lat:40.417,lon:-3.704},{n:"Barcelona",c:"España",lat:41.385,lon:2.173},{n:"Valencia",c:"España",lat:39.470,lon:-0.376},{n:"Sevilla",c:"España",lat:37.389,lon:-5.985},{n:"Bilbao",c:"España",lat:43.263,lon:-2.935},{n:"Lisboa",c:"Portugal",lat:38.722,lon:-9.139},
  {n:"New York",c:"USA",lat:40.713,lon:-74.006},{n:"Los Angeles",c:"USA",lat:34.052,lon:-118.244},{n:"Miami",c:"USA",lat:25.762,lon:-80.192},{n:"Chicago",c:"USA",lat:41.878,lon:-87.630},{n:"Houston",c:"USA",lat:29.760,lon:-95.370},{n:"Dallas",c:"USA",lat:32.777,lon:-96.797},{n:"San Francisco",c:"USA",lat:37.775,lon:-122.419},
  {n:"London",c:"UK",lat:51.507,lon:-0.128},{n:"París",c:"Francia",lat:48.857,lon:2.352},{n:"Berlin",c:"Alemania",lat:52.520,lon:13.405},{n:"Roma",c:"Italia",lat:41.903,lon:12.496},{n:"Amsterdam",c:"Países Bajos",lat:52.368,lon:4.904},
  {n:"Tokio",c:"Japón",lat:35.676,lon:139.650},{n:"Singapur",c:"Singapur",lat:1.352,lon:103.820},{n:"Dubai",c:"EAU",lat:25.205,lon:55.271},{n:"Bangkok",c:"Tailandia",lat:13.756,lon:100.502},{n:"Kuala Lumpur",c:"Malasia",lat:3.139,lon:101.687},
  {n:"Sydney",c:"Australia",lat:-33.869,lon:151.209},{n:"Melbourne",c:"Australia",lat:-37.814,lon:144.963},
  {n:"Toronto",c:"Canadá",lat:43.653,lon:-79.383},{n:"Vancouver",c:"Canadá",lat:49.283,lon:-123.121},{n:"Montreal",c:"Canadá",lat:45.502,lon:-73.567},
  {n:"El Cairo",c:"Egipto",lat:30.044,lon:31.236},{n:"Lagos",c:"Nigeria",lat:6.524,lon:3.379},{n:"Nairobi",c:"Kenia",lat:-1.292,lon:36.822},{n:"Johannesburgo",c:"Sudáfrica",lat:-26.204,lon:28.047},
  {n:"Ciudad de Panamá",c:"Panamá",lat:8.994,lon:-79.520},{n:"San José",c:"Costa Rica",lat:9.928,lon:-84.091},{n:"Guatemala City",c:"Guatemala",lat:14.635,lon:-90.507},{n:"Santo Domingo",c:"Rep. Dominicana",lat:18.486,lon:-69.931},{n:"La Habana",c:"Cuba",lat:23.114,lon:-82.367},{n:"San Juan",c:"Puerto Rico",lat:18.466,lon:-66.106},
];
function nrm(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function searchCities(q){if(!q||q.trim().length<2)return[];const t=nrm(q.trim());return CITIES.filter(c=>nrm(c.n).includes(t)||nrm(c.c).includes(t)).slice(0,8);}

// ── ORÁCULO PREGENERADO ─────────────────────────────────
// Textos por fase lunar × energía del día (rotación por fecha)
const ORACLE_TEXTS = {
  "Luna Nueva": {
    energia: ["Hoy es un buen día para empezar algo que llevas tiempo posponiendo. La Luna Nueva trae energía de comienzos, así que si tienes una idea en mente, este es el momento de darle el primer paso (Luna Nueva en fase de siembra).", "Puede que sientas ganas de hacer cambios en tu rutina o en cómo te presentas al mundo. Es normal — la Luna Nueva activa ese impulso de renovación. Aprovecha para escribir qué quieres lograr este mes (Luna Nueva favorece las intenciones).", "Si hoy te sientes con energía fresca y ganas de comenzar, no lo ignores. La Luna Nueva es el mejor momento para iniciar proyectos, tomar decisiones nuevas o simplemente resetear tu mentalidad (Luna Nueva, punto cero del ciclo lunar)."],
    amor: ["En las relaciones, hoy es buen día para tener una conversación que has evitado. La energía de inicio que trae la Luna Nueva también aplica al amor — puedes proponer algo nuevo o aclarar algo pendiente.", "Si estás sola, puede que sientas ganas de conocer gente nueva o de cambiar algo en cómo te relacionas. Escucha ese impulso — la Luna Nueva abre puertas en las conexiones (Luna Nueva activa la Casa 7 de las relaciones).", "En pareja, es un buen momento para plantear algo que quieres mejorar juntos. No es día de pelea sino de acuerdos nuevos (Luna Nueva favorece los nuevos compromisos)."],
    trabajo: ["En lo profesional, si tienes una propuesta o idea que quieres presentar, hoy tiene buena energía para hacerlo. La Luna Nueva apoya los inicios y las nuevas propuestas (Luna Nueva favorece los lanzamientos).", "Puede que sientas motivación para organizar tus metas laborales. Úsala — escribe tus objetivos del mes y prioriza lo que más importa (Luna Nueva pide claridad de intención).", "Si estás buscando trabajo o clientes nuevos, hoy es buena fecha para dar ese paso que has estado demorando. Envía ese mensaje, haz esa llamada (Luna Nueva, energía de inicio)."],
    consejo: ["Escribe una intención concreta para este mes — algo específico que quieras lograr o cambiar.", "Da el primer paso de ese proyecto que llevas aplazando. No tiene que ser perfecto, solo tiene que empezar.", "Haz una lista de lo que quieres dejar atrás y otra de lo que quieres traer a tu vida este ciclo."],
  },
  "Creciente": {
    energia: ["Puede que hoy sientas más energía y ganas de avanzar en tus proyectos. La Luna Creciente es la fase de acción — lo que sembraste en días anteriores empieza a moverse (Luna Creciente, fase de impulso).", "Si tienes cosas pendientes, hoy es buen día para atacarlas. La energía está a favor de avanzar, no de esperar (Luna Creciente activa la motivación y el movimiento).", "Puede que notes que las cosas empiezan a fluir un poco más. Aprovecha ese momento — actúa en lo que más importa y no te distraigas (Luna Creciente, momento de acción sostenida)."],
    amor: ["En las relaciones, la Luna Creciente favorece acercarte a alguien que te gusta o profundizar en una relación que ya tienes. Es momento de avanzar, no de esperar a que el otro dé el paso.", "Si hay algo que quieres decirle a tu pareja o a alguien que te interesa, hoy tienes la energía para hacerlo con más naturalidad (Luna Creciente da impulso a las expresiones afectivas).", "Puede que sientas más ganas de conectar con personas. Acepta esa invitación, escribe ese mensaje, haz ese plan — la Luna Creciente apoya las conexiones que van en crecimiento."],
    trabajo: ["La Luna Creciente es perfecta para avanzar en proyectos que ya están en marcha. Enfócate en uno o dos objetivos clave hoy y da pasos concretos (Luna Creciente, fase de construcción).", "Si tienes que negociar, presentar o comunicar algo en el trabajo, hoy la energía está a tu favor. La fluidez en la comunicación está activada (Mercurio se beneficia de la Luna Creciente).", "Es buen momento para hacer seguimiento a propuestas enviadas o para retomar conversaciones laborales que quedaron en pausa (Luna Creciente reactiva lo que estaba estancado)."],
    consejo: ["Elige una tarea importante que llevas evitando y hazla hoy, sin perfeccionismo.", "Comunica algo que tienes pendiente — un mensaje, una propuesta, una conversación.", "Avanza aunque no tengas todo claro. La Luna Creciente premia la acción, no la espera."],
  },
  "Cuarto Creciente": {
    energia: ["Puede que hoy enfrentes alguna decisión o elección que no puedes seguir aplazando. La energía del Cuarto Creciente te pide que elijas un camino (Cuarto Creciente, momento de decisión y compromiso).", "Si sientes tensión entre dos opciones o entre lo que quieres y lo que deberías hacer, es normal — esta fase lunar activa justo eso. La clave es decidir y comprometerte (Cuarto Creciente genera tensión creativa).", "Hoy puede que notes que las cosas requieren más esfuerzo de lo usual. No es señal de que algo está mal — es que la Luna pide que te comprometas de verdad con lo que estás construyendo (Cuarto Creciente exige decisión)."],
    amor: ["En el amor, puede que hoy tengas que tomar una decisión sobre una relación o situación que llevas evitando definir. La energía del día te empuja a clarificar (Cuarto Creciente pide definición en las relaciones).", "Si hay algo en tu relación que no está funcionando, hoy es buen día para hablarlo con honestidad. No para pelear, sino para decidir juntos qué quieren (Cuarto Creciente activa las conversaciones necesarias).", "Si estás en una situación de indecisión romántica — entre dos personas, entre quedarte o irte — hoy la energía te pide que elijas. Seguir sin decidir también tiene un costo (Cuarto Creciente, momento de comprometerse)."],
    trabajo: ["En lo profesional, si hay una decisión laboral que llevas aplazando, hoy es el momento de tomarla. Seguir en el limbo tiene un costo mayor que equivocarte y corregir (Cuarto Creciente exige acción decisiva).", "Puede que hoy el trabajo requiera más concentración y esfuerzo. Es buen día para resolver cosas complejas que requieren pensamiento profundo (Cuarto Creciente activa la mente analítica).", "Si tienes que presentar resultados, defender una propuesta o asumir una responsabilidad nueva, hoy tienes la energía para hacerlo (Cuarto Creciente da fuerza para comprometerse con lo importante)."],
    consejo: ["Toma esa decisión que llevas aplazando — cualquier decisión tomada con intención es mejor que seguir en el limbo.", "Habla con honestidad sobre algo que estás evitando, ya sea en el trabajo o en una relación.", "Comprométete con una sola prioridad hoy y dale toda tu energía a esa."],
  },
  "Gibosa Creciente": {
    energia: ["Puede que sientas que estás cerca de algo pero que falta un último empujón. Es exactamente lo que pide la Luna en esta fase — refinamiento y ajuste final antes de la culminación (Gibosa Creciente, fase de perfeccionamiento).", "Si hay algo que estás construyendo — un proyecto, una relación, una meta — hoy es buen día para revisarlo y mejorar los detalles. No es momento de empezar algo nuevo sino de perfeccionar lo que ya tienes (Gibosa Creciente pide atención al detalle).", "Puede que hoy te sientas con más claridad sobre lo que quieres y lo que te falta para lograrlo. Usa esa claridad para ajustar y prepararte para los próximos días (Gibosa Creciente activa la visión y el refinamiento)."],
    amor: ["En las relaciones, hoy es buen día para prestar atención a los detalles — un gesto, una conversación pendiente, algo que puedes mejorar en cómo te relacionas (Gibosa Creciente refina las conexiones).", "Si estás en pareja, puede que notes cosas pequeñas que mejorar en la dinámica. Es buen momento para ajustar, no para dramatizar — los cambios pequeños tienen gran impacto ahora (Gibosa Creciente favorece los ajustes sutiles).", "Si estás conociendo a alguien, hoy es buen día para profundizar un poco más — una conversación más honesta, un plan más concreto, una señal más clara de lo que quieres (Gibosa Creciente pide autenticidad)."],
    trabajo: ["La Gibosa Creciente es ideal para revisar y mejorar proyectos antes de presentarlos. Si tienes algo que entregar pronto, dale una última revisión hoy — puede que encuentres mejoras importantes.", "Es buen día para resolver detalles técnicos, corregir errores o afinar una propuesta. La energía del día favorece la precisión (Gibosa Creciente activa Virgo y la atención al detalle).", "Si tienes una presentación, entrega o reunión importante pronto, hoy prepárate bien. La Luna te apoya en afinar los detalles que marcan la diferencia (Gibosa Creciente, preparación para el momento cumbre)."],
    consejo: ["Revisa algo que tienes casi listo y hazle los ajustes finales que necesita.", "Presta atención a un detalle que estabas ignorando — puede ser más importante de lo que crees.", "Prepárate para algo importante que se viene — organiza, afina, anticipa."],
  },
  "Luna Llena": {
    energia: ["La Luna Llena trae claridad pero también puede intensificar las emociones. Si hoy sientes más de lo usual — más emoción, más sensibilidad, más necesidad de conexión — es normal (Luna Llena amplifica todo lo que sientes).", "Puede que hoy algo llegue a su punto de culminación — una decisión que se resuelve, un resultado que llega, una verdad que sale a la luz. La Luna Llena es momento de cosecha y revelación (Luna Llena en oposición al Sol activa la consciencia).", "Si te sientes más emocional o reactiva de lo usual hoy, no te pelees con eso. La Luna Llena intensifica las emociones y también la intuición — úsalas como información, no como excusa para reaccionar impulsivamente."],
    amor: ["La Luna Llena es la fase más intensa para las relaciones. Puede que algo que estaba oculto salga a la luz, o que un sentimiento que tenías guardado se exprese (Luna Llena activa la honestidad emocional).", "Si hay algo que necesitas decirle a alguien — ya sea con amor o con límites — hoy tienes la energía emocional para hacerlo. Solo cuida la forma, porque la intensidad está alta (Luna Llena puede exagerar las reacciones).", "En el amor, la Luna Llena puede traer momentos de gran conexión o de confrontación necesaria. En cualquier caso, lo que pase hoy tiene peso — estate presente y honesta (Luna Llena, momento de verdad en las relaciones)."],
    trabajo: ["En lo profesional, la Luna Llena puede traer resultados — una respuesta que esperabas, el cierre de un proceso, el reconocimiento de algo que hiciste. Estate atenta a las señales (Luna Llena, momento de cosecha profesional).", "Puede que hoy tengas más dificultad para concentrarte porque las emociones están altas. Si es así, prioriza el trabajo que requiere creatividad o conexión con personas, no el que requiere análisis frío (Luna Llena favorece lo emocional sobre lo analítico).", "Si hoy se resuelve algo que tenías pendiente — una negociación, una respuesta, un proyecto — celebra aunque el resultado no sea perfecto. La Luna Llena cierra ciclos (Luna Llena, cierre de etapas)."],
    consejo: ["Exprésate con honestidad hoy — lo que sientes tiene más peso del que crees.", "Celebra algo que has logrado, aunque sea pequeño. La Luna Llena es momento de reconocer el camino recorrido.", "Si te sientes abrumada, sal un momento al aire libre y mira la luna — literalmente te ayuda a bajar la intensidad."],
  },
  "Gibosa Menguante": {
    energia: ["Puede que hoy sientas que el impulso de los últimos días baja un poco. Es normal — la Luna Menguante pide que empieces a soltar lo que ya no necesitas y a dar gracias por lo que tienes (Gibosa Menguante, fase de gratitud y compartir).", "Es buen momento para reflexionar sobre lo que lograste en este ciclo y para compartir lo que sabes con otros. La energía del día favorece la generosidad y la enseñanza (Gibosa Menguante activa el dar y el compartir).", "Puede que hoy tengas ganas de ordenar, limpiar o cerrar cosas pendientes. Hazle caso a ese impulso — la Gibosa Menguante apoya la organización y el cierre de procesos (Luna Menguante pide que liberes lo que ya cumplió su ciclo)."],
    amor: ["En las relaciones, la Gibosa Menguante favorece la gratitud y el reconocimiento. Dile a alguien que aprecias lo que hace por ti — esos gestos pequeños fortalecen los vínculos más de lo que crees.", "Si hay algo en una relación que ya no te está sirviendo — una dinámica, un patrón, una expectativa — hoy tienes claridad para verlo y empezar a soltarlo (Gibosa Menguante, momento de liberar lo que ya no sirve en el amor).", "Es buen día para compartir tiempo de calidad con personas que quieres sin agenda ni presión. La energía del día favorece la conexión tranquila y genuina (Gibosa Menguante activa la calidez en las relaciones)."],
    trabajo: ["Es buen momento para cerrar proyectos que están casi terminados, entregar pendientes y ordenar tu espacio de trabajo (Gibosa Menguante favorece los cierres y la organización).", "Puede que hoy tengas claridad sobre algo que no está funcionando en tu trabajo y necesitas cambiar. No lo ignores — esta fase da visión para ver lo que hay que soltar (Gibosa Menguante activa el discernimiento).", "Es buen día para reconocer el trabajo de tu equipo o para agradecer a alguien que te ha apoyado en lo profesional. Esos gestos también construyen (Gibosa Menguante, energía de reconocimiento y gratitud)."],
    consejo: ["Agradece a alguien hoy — de verdad, con palabras específicas. No des por hecho el apoyo que recibes.", "Cierra algo que llevas tiempo postergando. La Gibosa Menguante te da la energía para terminar.", "Suelta una expectativa que te está pesando — no todo tiene que salir como lo planeaste."],
  },
  "Cuarto Menguante": {
    energia: ["Puede que hoy sientas más necesidad de soledad o de bajar el ritmo. No te fuerces — el Cuarto Menguante pide introspección y es perfectamente válido necesitar un respiro (Cuarto Menguante, fase de soltar y perdonar).", "Es buen momento para revisar qué hábitos, relaciones o situaciones ya no te están sirviendo. No para actuar todavía, sino para tener claridad sobre lo que quieres dejar ir (Cuarto Menguante activa el discernimiento).", "Si hoy te sientes más cansada o menos motivada que los días anteriores, es la Luna haciendo su trabajo — te está pidiendo que descanses y proceses antes del próximo ciclo (Cuarto Menguante, fase natural de desaceleración)."],
    amor: ["En las relaciones, el Cuarto Menguante invita a perdonar — ya sea a alguien que te lastimó o a ti misma por algo que hiciste o dejaste de hacer. El perdón no es para el otro, es para liberarte a ti (Cuarto Menguante activa la sanación emocional).", "Si hay una relación que sabes que ya terminó pero no has podido soltar, hoy tienes más fuerza para empezar ese proceso de desapego. No tienes que resolverlo todo hoy, solo dar el primer paso interno (Cuarto Menguante, momento de dejar ir).", "Es buen día para una conversación honesta y tranquila — sin drama, sin exigencias. Solo para aclarar y sanar algo que quedó pendiente (Cuarto Menguante favorece las conversaciones de cierre y sanación)."],
    trabajo: ["El Cuarto Menguante es buen momento para evaluar qué en tu trabajo ya no te está dando resultados y planear cambios para el próximo ciclo. No es momento de lanzar cosas nuevas sino de reflexionar (Cuarto Menguante, fase de evaluación).", "Si tienes pendientes que llevas días posponiendo, hoy es buen día para cerrarlos definitivamente. La energía del día apoya los finales y los cierres (Cuarto Menguante favorece terminar lo inconcluso).", "Considera si hay algo en tu trabajo que te está pesando innecesariamente — una responsabilidad que no es tuya, un proyecto que ya no tiene sentido, una dinámica que te drena. Identifícalo hoy aunque no lo resuelvas todavía."],
    consejo: ["Date permiso de descansar sin culpa. No siempre tienes que estar en modo productivo.", "Reflexiona sobre algo que quieres dejar atrás en el próximo ciclo — una creencia, un hábito, una situación.", "Practica soltar algo pequeño hoy: una expectativa, un rencor, una tarea que no te corresponde."],
  },
  "Menguante": {
    energia: ["La Luna Menguante es la fase de descanso y reflexión antes del próximo ciclo. Si hoy sientes poca energía o ganas de estar tranquila, es exactamente lo que la Luna está pidiendo (Luna Menguante, fase de cierre y reposo).", "Es momento de procesar lo que viviste en este ciclo lunar antes de empezar uno nuevo. No tomes decisiones importantes hoy — más bien observa y reflexiona (Luna Menguante, tiempo de integración).", "Puede que hoy sientas más sensibilidad o ganas de estar en silencio. Honra eso — la introspección de hoy siembra la claridad de mañana (Luna Menguante activa la sabiduría interior)."],
    amor: ["En las relaciones, la Luna Menguante favorece la conexión tranquila — una conversación íntima, un momento de silencio compartido, simplemente estar presente sin agenda (Luna Menguante, energía de profundidad sin drama).", "Si estás procesando algo difícil en el amor, hoy tienes más capacidad de ver las cosas con perspectiva. No actúes todavía, solo observa lo que sientes con honestidad (Luna Menguante, momento de claridad emocional).", "Es buen día para dedicarte tiempo a ti misma antes de volver a dar. Las relaciones sanas empiezan por estar bien contigo (Luna Menguante activa el autocuidado y la recarga)."],
    trabajo: ["La Luna Menguante no es la mejor fase para lanzar proyectos nuevos, pero sí para planear y preparar el siguiente ciclo. Organiza tus ideas para lo que viene (Luna Menguante, momento de planificación).", "Puede que hoy el trabajo fluya mejor si lo haces de forma tranquila y sin presión. Evita programar reuniones o presentaciones importantes si puedes — guárdalas para cuando la energía suba (Luna Menguante, fase de baja energía natural).", "Es buen momento para hacer trabajo introspectivo — evaluar procesos, revisar estrategias, documentar aprendizajes. Ese trabajo invisible es el que siembra los resultados futuros (Luna Menguante favorece la reflexión sobre la acción)."],
    consejo: ["Descansa de verdad hoy. El descanso es parte del proceso, no el enemigo de la productividad.", "Escribe en un diario o en notas lo que aprendiste de este ciclo — una lección, un logro, algo que quieres cambiar.", "Prepara con calma lo que quieres iniciar en la próxima Luna Nueva."],
  },
};

const ORACLE_TEXTS_EN = {
  "Luna Nueva": {
    energia: ["Today is a good day to start something you've been putting off. The New Moon brings the energy of beginnings, so if you've got an idea in mind, this is the moment to take the first step (New Moon, planting-the-seeds phase).", "You might feel the urge to shake up your routine or how you present yourself to the world. That's normal — the New Moon activates that craving for renewal. Use it to write down what you want to accomplish this month (the New Moon favors setting intentions).", "If you're feeling fresh energy and the itch to begin today, don't ignore it. The New Moon is the best time to start projects, make new decisions, or simply reset your mindset (New Moon, the zero point of the lunar cycle)."],
    amor: ["In relationships, today is a good day for that conversation you've been avoiding. The fresh-start energy of the New Moon applies to love too — you can propose something new or clear up something unresolved.", "If you're single, you might feel like meeting new people or changing something about how you connect with others. Listen to that pull — the New Moon opens doors in your relationships (the New Moon activates the 7th House of relationships).", "If you're in a relationship, it's a good moment to bring up something you want to improve together. Today's not for fighting — it's for making new agreements (the New Moon favors new commitments)."],
    trabajo: ["Professionally, if you have a proposal or idea you want to pitch, today carries good energy for it. The New Moon supports beginnings and new proposals (the New Moon favors launches).", "You might feel motivated to organize your work goals. Use it — write down your objectives for the month and prioritize what matters most (the New Moon asks for clarity of intention).", "If you're job hunting or looking for new clients, today is a good day to take that step you've been delaying. Send that message, make that call (New Moon, beginnings energy)."],
    consejo: ["Write down a concrete intention for this month — something specific you want to achieve or change.", "Take the first step on that project you keep postponing. It doesn't have to be perfect, it just has to start.", "Make a list of what you want to leave behind and another of what you want to bring into your life this cycle."],
  },
  "Creciente": {
    energia: ["You might feel more energy and drive to move your projects forward today. The Waxing Crescent Moon is the action phase — what you planted in recent days starts to move (Waxing Crescent, momentum phase).", "If you have things pending, today is a good day to tackle them. The energy favors moving forward, not waiting (the Waxing Crescent activates motivation and momentum).", "You might notice things starting to flow a bit more easily. Make the most of it — act on what matters most and don't get distracted (Waxing Crescent, a moment of sustained action)."],
    amor: ["In relationships, the Waxing Crescent favors getting closer to someone you like or deepening a relationship you already have. It's a moment to move forward, not wait for the other person to make the first move.", "If there's something you want to tell your partner or someone you're interested in, today you have the energy to say it more naturally (the Waxing Crescent fuels emotional expression).", "You might feel more drawn to connect with people. Accept that invitation, send that text, make that plan — the Waxing Crescent supports connections that are growing."],
    trabajo: ["The Waxing Crescent is perfect for moving forward on projects already in motion. Focus on one or two key goals today and take concrete steps (Waxing Crescent, building phase).", "If you need to negotiate, present, or communicate something at work, today the energy is on your side. Smooth communication is activated (Mercury benefits from the Waxing Crescent).", "It's a good time to follow up on proposals you've sent or pick back up on work conversations that stalled (the Waxing Crescent reactivates what was stuck)."],
    consejo: ["Pick one important task you've been avoiding and do it today, without aiming for perfection.", "Communicate something you've been sitting on — a message, a proposal, a conversation.", "Move forward even if you don't have it all figured out. The Waxing Crescent rewards action, not waiting."],
  },
  "Cuarto Creciente": {
    energia: ["You might face a decision today that you can't keep putting off. The First Quarter Moon's energy asks you to choose a path (First Quarter, a moment of decision and commitment).", "If you feel tension between two options, or between what you want and what you feel you should do, that's normal — this lunar phase stirs up exactly that. The key is to decide and commit (the First Quarter generates creative tension).", "Today things might feel like they require more effort than usual. That's not a sign something's wrong — it's the Moon asking you to truly commit to what you're building (the First Quarter demands decision)."],
    amor: ["In love, today you might have to make a decision about a relationship or situation you've been avoiding defining. The day's energy is pushing you toward clarity (the First Quarter calls for defining relationships).", "If something in your relationship isn't working, today is a good day to talk about it honestly. Not to fight, but to decide together what you both want (the First Quarter activates necessary conversations).", "If you're stuck in romantic indecision — between two people, between staying or leaving — today's energy is asking you to choose. Staying undecided has a cost too (First Quarter, time to commit)."],
    trabajo: ["Professionally, if there's a work decision you've been postponing, today's the moment to make it. Staying in limbo costs more than making a mistake and correcting it (the First Quarter demands decisive action).", "Work might require more focus and effort today. It's a good day to tackle complex things that need deep thinking (the First Quarter activates the analytical mind).", "If you need to present results, defend a proposal, or take on a new responsibility, today you have the energy for it (the First Quarter gives you the strength to commit to what matters)."],
    consejo: ["Make the decision you've been postponing — any decision made with intention beats staying in limbo.", "Speak honestly about something you're avoiding, whether at work or in a relationship.", "Commit to a single priority today and give it all your energy."],
  },
  "Gibosa Creciente": {
    energia: ["You might feel like you're close to something but missing that last push. That's exactly what the Moon is asking for in this phase — refinement and final adjustments before culmination (Waxing Gibbous, the perfecting phase).", "If you're building something — a project, a relationship, a goal — today is a good day to review it and polish the details. It's not the time to start something new, but to perfect what you already have (the Waxing Gibbous calls for attention to detail).", "You might feel clearer today about what you want and what's still missing to get there. Use that clarity to adjust and prepare for the coming days (the Waxing Gibbous activates vision and refinement)."],
    amor: ["In relationships, today is a good day to pay attention to the details — a gesture, a pending conversation, something you can improve in how you connect with others (the Waxing Gibbous refines connections).", "If you're in a relationship, you might notice small things worth improving in the dynamic. It's a good time to adjust, not to dramatize — small changes have a big impact right now (the Waxing Gibbous favors subtle adjustments).", "If you're getting to know someone, today is a good day to go a bit deeper — a more honest conversation, a more concrete plan, a clearer sign of what you want (the Waxing Gibbous calls for authenticity)."],
    trabajo: ["The Waxing Gibbous is ideal for reviewing and improving projects before presenting them. If you have something due soon, give it one last pass today — you might find important improvements.", "It's a good day to sort out technical details, fix errors, or fine-tune a proposal. Today's energy favors precision (the Waxing Gibbous activates Virgo-like attention to detail).", "If you have an important presentation, deliverable, or meeting coming up, prepare well today. The Moon supports you in nailing the details that make the difference (Waxing Gibbous, preparing for the peak moment)."],
    consejo: ["Review something that's almost ready and make the final adjustments it needs.", "Pay attention to a detail you've been ignoring — it might matter more than you think.", "Prepare for something important that's coming up — organize, fine-tune, anticipate."],
  },
  "Luna Llena": {
    energia: ["The Full Moon brings clarity but can also intensify emotions. If you're feeling more than usual today — more emotion, more sensitivity, more need for connection — that's normal (the Full Moon amplifies everything you feel).", "Something might reach its culmination today — a decision gets resolved, a result arrives, a truth comes to light. The Full Moon is a time of harvest and revelation (the Full Moon, opposite the Sun, activates awareness).", "If you feel more emotional or reactive than usual today, don't fight it. The Full Moon intensifies emotions and intuition alike — use them as information, not as an excuse to react impulsively."],
    amor: ["The Full Moon is the most intense phase for relationships. Something that was hidden might come to light, or a feeling you'd been holding back might finally be expressed (the Full Moon activates emotional honesty).", "If there's something you need to tell someone — whether out of love or to set a boundary — today you have the emotional energy to do it. Just mind how you say it, because intensity is running high (the Full Moon can exaggerate reactions).", "In love, the Full Moon can bring moments of deep connection or necessary confrontation. Either way, what happens today carries weight — be present and honest (Full Moon, a moment of truth in relationships)."],
    trabajo: ["Professionally, the Full Moon can bring results — an answer you were waiting for, the close of a process, recognition for something you did. Stay alert for the signs (Full Moon, a moment of professional harvest).", "You might find it harder to concentrate today because emotions are running high. If so, prioritize work that needs creativity or human connection over work that needs cold analysis (the Full Moon favors the emotional over the analytical).", "If something you'd been waiting on gets resolved today — a negotiation, an answer, a project — celebrate it even if the outcome isn't perfect. The Full Moon closes cycles (Full Moon, the closing of chapters)."],
    consejo: ["Express yourself honestly today — what you feel carries more weight than you think.", "Celebrate something you've achieved, even something small. The Full Moon is a time to acknowledge how far you've come.", "If you feel overwhelmed, step outside for a moment and look at the moon — it literally helps bring the intensity down."],
  },
  "Gibosa Menguante": {
    energia: ["You might feel the momentum of recent days easing off a bit today. That's normal — the Waning Moon asks you to start letting go of what you no longer need and to give thanks for what you have (Waning Gibbous, the gratitude-and-sharing phase).", "It's a good time to reflect on what you've accomplished this cycle and to share what you know with others. Today's energy favors generosity and teaching (the Waning Gibbous activates giving and sharing).", "You might feel like tidying up, cleaning, or wrapping up loose ends today. Go with that impulse — the Waning Gibbous supports organizing and closing out processes (the Waning Moon asks you to release what's already served its cycle)."],
    amor: ["In relationships, the Waning Gibbous favors gratitude and recognition. Tell someone you appreciate what they do for you — those small gestures strengthen bonds more than you'd think.", "If something in a relationship isn't serving you anymore — a dynamic, a pattern, an expectation — today you have the clarity to see it and start letting it go (the Waning Gibbous, a moment to release what no longer serves love).", "It's a good day to spend quality time with people you love, without an agenda or pressure. Today's energy favors calm, genuine connection (the Waning Gibbous activates warmth in relationships)."],
    trabajo: ["It's a good time to close out projects that are nearly finished, deliver pending work, and tidy your workspace (the Waning Gibbous favors wrapping up and organizing).", "You might gain clarity today about something that isn't working in your job and needs to change. Don't ignore it — this phase gives you the vision to see what needs to be released (the Waning Gibbous activates discernment).", "It's a good day to recognize your team's work or to thank someone who has supported you professionally. Those gestures build things too (Waning Gibbous, the energy of recognition and gratitude)."],
    consejo: ["Thank someone today — genuinely, with specific words. Don't take the support you receive for granted.", "Close something you've been putting off for a while. The Waning Gibbous gives you the energy to finish it.", "Let go of an expectation that's weighing on you — not everything has to go exactly as planned."],
  },
  "Cuarto Menguante": {
    energia: ["You might feel a stronger need for solitude or to slow down today. Don't push against it — the Last Quarter asks for introspection, and it's perfectly valid to need a breather (Last Quarter, the letting-go-and-forgiving phase).", "It's a good time to review which habits, relationships, or situations aren't serving you anymore. Not to act on it yet, just to get clear on what you want to release (the Last Quarter activates discernment).", "If you feel more tired or less motivated than the past few days, that's the Moon doing its work — it's asking you to rest and process before the next cycle begins (Last Quarter, a natural slowing-down phase)."],
    amor: ["In relationships, the Last Quarter invites forgiveness — whether of someone who hurt you or of yourself for something you did or didn't do. Forgiveness isn't for the other person, it's to free yourself (the Last Quarter activates emotional healing).", "If there's a relationship you know is already over but haven't been able to let go of, today you have more strength to begin that process of detachment. You don't have to resolve it all today, just take the first internal step (Last Quarter, time to let go).", "It's a good day for an honest, calm conversation — no drama, no demands. Just to clear the air and heal something left unresolved (the Last Quarter favors closure and healing conversations)."],
    trabajo: ["The Last Quarter is a good time to evaluate what in your work isn't paying off anymore and to plan changes for the next cycle. It's not a time to launch new things but to reflect (Last Quarter, evaluation phase).", "If you have pending tasks you've been postponing for days, today is a good day to close them out for good. The day's energy supports endings and closures (the Last Quarter favors finishing the unfinished).", "Consider whether there's something at work weighing on you unnecessarily — a responsibility that isn't yours, a project that no longer makes sense, a dynamic that drains you. Name it today even if you don't solve it yet."],
    consejo: ["Give yourself permission to rest without guilt. You don't always have to be in productivity mode.", "Reflect on something you want to leave behind in the next cycle — a belief, a habit, a situation.", "Practice letting go of something small today: an expectation, a grudge, a task that isn't yours to carry."],
  },
  "Menguante": {
    energia: ["The Waning Moon is the phase of rest and reflection before the next cycle. If you feel low on energy or just want some quiet today, that's exactly what the Moon is asking for (Waning Moon, closing-and-resting phase).", "It's a time to process what you lived through this lunar cycle before starting a new one. Don't make big decisions today — instead, observe and reflect (Waning Moon, integration time).", "You might feel more sensitive or drawn to silence today. Honor that — today's introspection plants tomorrow's clarity (the Waning Moon activates inner wisdom)."],
    amor: ["In relationships, the Waning Moon favors quiet connection — an intimate conversation, a shared moment of silence, simply being present without an agenda (Waning Moon, depth without drama).", "If you're processing something difficult in love, today you have more capacity to see things with perspective. Don't act yet, just observe what you feel with honesty (Waning Moon, a moment of emotional clarity).", "It's a good day to spend time on yourself before giving to others again. Healthy relationships start with being okay within yourself (the Waning Moon activates self-care and recharging)."],
    trabajo: ["The Waning Moon isn't the best phase for launching new projects, but it's great for planning and preparing the next cycle. Organize your ideas for what's coming (Waning Moon, planning time).", "Work might flow better today if you approach it calmly and without pressure. Avoid scheduling important meetings or presentations if you can — save them for when the energy picks back up (Waning Moon, a naturally low-energy phase).", "It's a good time to do introspective work — evaluate processes, review strategies, document what you've learned. That invisible work is what plants future results (the Waning Moon favors reflection over action)."],
    consejo: ["Really rest today. Rest is part of the process, not the enemy of productivity.", "Write in a journal or notes about what you learned from this cycle — a lesson, an achievement, something you want to change.", "Calmly prepare what you want to start at the next New Moon."],
  },
};

function getOracleForToday(chart, transits, language) {
  const moon = getMoonPhase();
  const table = language === "en" ? ORACLE_TEXTS_EN : ORACLE_TEXTS;
  const fallbackTable = language === "en" ? ORACLE_TEXTS_EN : ORACLE_TEXTS;
  const texts = table[moon.name] || fallbackTable["Creciente"];
  // Rotate texts by day of month so it cambia cada día
  const day = new Date().getDate();
  const idx = day % 3;
  // Personalize consejo if we have chart
  let consejo = texts.consejo[idx];
  if (chart) {
    const sunSign = chart.planets.Sol.sign;
    const moonSign = chart.planets.Luna.sign;
    const extras = language === "en" ? [
      `Remember that your Moon in ${moonSign} needs to feel safe before it acts — giving yourself that space today is productive, not lazy.`,
      `With your Sun in ${sunSign}, you have more strength than you give yourself credit for. Put it toward something concrete today.`,
      `Your birth chart is asking for authenticity. Today, be honest with yourself about what you actually want.`,
    ] : [
      `Recuerda que tu Luna en ${moonSign} necesita sentirse segura antes de actuar — darte ese espacio hoy es productivo, no pereza.`,
      `Con tu Sol en ${sunSign}, tienes más fuerza de la que crees. Úsala en algo concreto hoy.`,
      `Tu carta natal pide autenticidad. Hoy, sé honesta contigo misma sobre qué quieres realmente.`,
    ];
    consejo = extras[day % 3] || consejo;
  }
  return {
    energia: texts.energia[idx],
    amor: texts.amor[idx],
    trabajo: texts.trabajo[idx],
    consejo,
    moon,
  };
}

// ── TAROT PREGENERADO ───────────────────────────────────
const TAROT = [
  {n:"El Loco",s:"0",past:"Hubo una época en que diste un salto al vacío sin saber exactamente a dónde ibas. Esa valentía te trajo hasta aquí.",present:"Estás en un momento de inicio, aunque quizás no lo sientas así. Hay algo nuevo que quiere nacer a través de ti.",future:"Se viene un comienzo inesperado. No lo planees demasiado — simplemente muévete con confianza cuando llegue la señal."},
  {n:"El Mago",s:"I",past:"Tuviste en tus manos todos los recursos que necesitabas para hacer algo grande, y lo usaste mejor de lo que crees.",present:"Tienes más capacidades de las que reconoces ahora mismo. El problema no es lo que te falta, sino creer en lo que ya tienes.",future:"Pronto tendrás la oportunidad de manifestar algo que llevas tiempo queriendo. Confía en tu capacidad de hacerlo realidad."},
  {n:"La Sacerdotisa",s:"II",past:"Hubo momentos en que tu intuición te habló claro y la escuchaste — aunque no entendieras exactamente por qué.",present:"Algo importante está ocurriendo bajo la superficie. No todo lo que necesitas saber está en la superficie — confía en lo que sientes aunque no puedas explicarlo.",future:"La respuesta que buscas llegará cuando dejes de buscarla con la mente y empieces a escuchar con el cuerpo y la intuición."},
  {n:"La Emperatriz",s:"III",past:"Hubo un periodo de abundancia, creatividad o cuidado intenso hacia otros — y ese tiempo dejó semillas que aún están creciendo.",present:"Tienes la energía para crear y nutrir. Ya sea un proyecto, una relación o tu propio bienestar — la Emperatriz dice que tienes lo que se necesita.",future:"Se viene un periodo de florecimiento. Lo que has cuidado con paciencia va a dar frutos visibles. No dejes de regarlo."},
  {n:"El Emperador",s:"IV",past:"Tomaste decisiones firmes que establecieron una base sólida. No todo fue fácil, pero esa estabilidad la construiste tú.",present:"Necesitas más estructura y claridad en algún área de tu vida. No todo puede estar en el aire — elige una prioridad y comprométete con ella.",future:"La estabilidad que buscas viene de dentro, no de afuera. Cuando establezcas límites claros y decisiones firmes, lo demás se acomoda."},
  {n:"El Hierofante",s:"V",past:"Aprendiste de alguien o de una tradición que te formó de formas que todavía llevas contigo, algunas que te sirven y otras que estás revisando.",present:"Puede que estés cuestionando algo en lo que antes creías — una norma, un sistema, una institución. Es válido preguntarse qué sigue siendo tuyo y qué ya no.",future:"Encontrarás orientación en un maestro, una comunidad o una enseñanza que te dará exactamente el marco que necesitas. Mantente abierta."},
  {n:"Los Enamorados",s:"VI",past:"Hubo una elección importante — quizás entre dos caminos, dos personas o dos versiones de ti misma. Esa decisión te definió más de lo que crees.",present:"Estás ante una elección real. No se trata solo del amor romántico — puede ser entre valores, entre lo que quieres y lo que deberías hacer, entre quedarte o moverte.",future:"La decisión que tomes pronto vendrá del corazón, no de la lógica. Y eso está bien — algunas elecciones solo se hacen bien cuando las toma el amor."},
  {n:"El Carro",s:"VII",past:"Superaste algo que parecía imposible usando pura determinación. Esa victoria te mostró de lo que eres capaz cuando te enfocas.",present:"Tienes la fuerza para avanzar, pero necesitas dirección clara. No sirve de nada acelerar si no sabes exactamente hacia dónde vas.",future:"Un logro importante se acerca. Requiere que mantengas el control de tus emociones y que no pierdas el rumbo aunque el camino se ponga difícil."},
  {n:"La Fuerza",s:"VIII",past:"Pasaste por algo que requirió de ti más paciencia y control de lo que parece. No fue debilidad — fue una fortaleza diferente a la que conocías.",present:"La situación que enfrentas ahora no se resuelve con fuerza bruta sino con calma, compasión y firmeza interior. Tienes eso más de lo que crees.",future:"Tu mayor fortaleza en lo que viene no será la dureza sino la gentileza — contigo misma y con otros. Eso es lo que va a marcar la diferencia."},
  {n:"El Ermitaño",s:"IX",past:"Hubo un periodo de soledad o retiro — voluntario o no — que te enseñó cosas sobre ti misma que solo el silencio puede revelar.",present:"Necesitas tiempo para ti, aunque sientas que no puedes permitirte ese lujo. La respuesta que buscas no está afuera — está en un momento de quietud honesta.",future:"Un periodo de reflexión se acerca. No lo veas como aislamiento sino como la preparación necesaria para el siguiente capítulo de tu historia."},
  {n:"La Rueda",s:"X",past:"Has vivido ciclos de altibajos que te han enseñado que nada es permanente — ni lo bueno ni lo malo. Esa lección vale más de lo que parece.",present:"Algo está cambiando en tu vida, aunque todavía no lo veas claramente. Los cambios de la Rueda no siempre se anuncian — simplemente ocurren.",future:"Un giro importante se viene. Puede ser a tu favor o puede ser un desafío — en cualquier caso, estás mejor preparada para recibirlo de lo que piensas."},
  {n:"La Justicia",s:"XI",past:"Algo en el pasado llegó a su justa consecuencia, para bien o para mal. La vida equilibró una balanza que necesitaba ajuste.",present:"Una situación en tu vida pide honestidad y equilibrio. Si estás tomando más de lo que das, o dando más de lo que recibes, la Justicia te pide que lo corrijas.",future:"Lo que das ahora volverá a ti. La Justicia no castiga ni premia — simplemente equilibra. Actúa con integridad y el resultado será justo."},
  {n:"El Colgado",s:"XII",past:"Hubo un tiempo en que las cosas se detuvieron y tuviste que esperar, aunque odiabas la espera. Esa pausa tenía un propósito que quizás ahora puedes ver.",present:"Estás en una pausa — voluntaria o forzada. En vez de luchar contra ella, úsala para ver las cosas desde un ángulo diferente. Hay algo que no estás viendo.",future:"La situación que sientes estancada se va a mover, pero en el tiempo correcto y no en el tuyo. La clave ahora es soltar el control y confiar en el proceso."},
  {n:"La Muerte",s:"XIII",past:"Algo terminó que tuvo que terminar, aunque doliera. Ese final hizo espacio para lo que vino después y que no hubiera llegado de otra forma.",present:"Estás en medio de una transformación. Algo tiene que morir para que algo nuevo nazca — puede ser una relación, una versión de ti misma o una forma de hacer las cosas.",future:"Un final importante se acerca, pero no lo veas con miedo. Lo que viene después es mejor que lo que está terminando — aunque todavía no puedas verlo."},
  {n:"La Templanza",s:"XIV",past:"Aprendiste a combinar cosas opuestas — emociones y razón, velocidad y paciencia — de formas que te dieron un equilibrio que no tenías antes.",present:"La situación que enfrentas pide moderación y paciencia. No es momento de extremos — ni de rendirte ni de forzar. El camino del medio es el más poderoso ahora.",future:"Lo que buscas se logra con tiempo, paciencia y la mezcla correcta de esfuerzo y soltar. No todo tiene que pasar ya. Confía en el proceso gradual."},
  {n:"El Diablo",s:"XV",past:"Hubo algo — una persona, un hábito, una situación — que tuvo más poder sobre ti del que debería haber tenido. Reconocerlo fue el primer paso para liberarte.",present:"Puede que estés en una situación donde sientes que no tienes opciones o que algo te tiene atrapada. La verdad es que tienes más poder del que crees — solo tienes que verlo.",future:"Te liberarás de algo que te ha estado limitando. El primer paso es reconocer que la cadena existe — el segundo es darte cuenta de que puedes quitártela."},
  {n:"La Torre",s:"XVI",past:"Algo se derrumbó de forma inesperada — un plan, una relación, una certeza. Ese colapso fue doloroso pero necesario para construir algo más real.",present:"Puede que sientas que algo en tu vida está a punto de cambiar bruscamente, o que algo que creías sólido empieza a tambalearse. Resiste el impulso de aferrarte a lo que ya está cayendo.",future:"Un cambio inesperado se viene. No lo puedes evitar, pero sí puedes decidir cómo responderás. Las Torres caen para revelar lo que era verdadero debajo de todo."},
  {n:"La Estrella",s:"XVII",past:"Después de algo difícil, encontraste una chispa de esperanza que no se apagó aunque el momento era oscuro. Esa chispa te trajo hasta aquí.",present:"Estás en un momento de renovación y sanación, aunque quizás no lo sientas así todavía. Hay motivos reales para tener esperanza — busca los pequeños pero concretos.",future:"Viene un periodo de calma y claridad después de lo que has atravesado. La Estrella no promete que todo será perfecto — promete que habrá luz y que será suficiente."},
  {n:"La Luna",s:"XVIII",past:"Hubo un periodo de confusión, miedos o ilusiones que te costó atravesar. Puede que todavía estés procesando algunas de las lecciones que dejó.",present:"Las cosas no son del todo lo que parecen ahora mismo. Hay algo oculto o que no estás viendo con claridad. No tomes decisiones importantes hasta que la niebla se despeje.",future:"La confusión actual es temporal. Cuando la Luna pase, verás con mucha más claridad lo que está pasando y sabrás exactamente qué hacer."},
  {n:"El Sol",s:"XIX",past:"Hubo un momento de gran alegría, logro o claridad que te recordó lo que se siente cuando las cosas fluyen y todo tiene sentido.",present:"Hay más motivos para celebrar en tu vida de los que estás reconociendo. La energía del Sol pide que veas lo bueno, no porque lo difícil no exista, sino porque también lo bueno es real.",future:"Se viene un periodo de vitalidad, claridad y éxito visible. No todo se resolverá de golpe, pero la dirección es hacia arriba y hacia adelante. Mantén esa energía."},
  {n:"El Juicio",s:"XX",past:"Tuviste una revelación importante o un momento de honestidad contigo misma que cambió cómo te ves a ti y a tu historia.",present:"Hay un llamado interno que estás escuchando o que necesitas escuchar. No se trata de lo que otros esperan de ti — se trata de lo que tú sabes que tienes que hacer.",future:"Pronto tendrás una claridad nueva sobre tu propósito o dirección. Cuando llegue esa revelación, no la ignores aunque sea incómoda — te está guiando hacia algo importante."},
  {n:"El Mundo",s:"XXI",past:"Completaste algo significativo — un ciclo, un aprendizaje, una etapa de vida. Ese logro vale más de lo que le das crédito.",present:"Estás cerca de completar algo importante. No abandones ahora — la llegada está más cerca de lo que parece.",future:"Un ciclo importante está por cerrarse de forma satisfactoria. Lo que has construido y aprendido te ha llevado exactamente a donde necesitabas estar. El próximo ciclo comienza desde un lugar más sabio."},
];

const TAROT_EN = [
  {n:"The Fool",s:"0",past:"There was a time when you leapt into the unknown without knowing exactly where you were headed. That courage is what brought you here.",present:"You're in a moment of beginnings, even if it doesn't feel that way. Something new wants to be born through you.",future:"An unexpected beginning is coming. Don't over-plan it — just move with confidence when the signal arrives."},
  {n:"The Magician",s:"I",past:"You held every resource you needed to do something great in your hands, and you used them better than you give yourself credit for.",present:"You have more ability than you're recognizing right now. The problem isn't what you're missing, it's believing in what you already have.",future:"Soon you'll have the chance to manifest something you've wanted for a long time. Trust your ability to make it real."},
  {n:"The High Priestess",s:"II",past:"There were moments when your intuition spoke clearly and you listened — even without fully understanding why.",present:"Something important is happening beneath the surface. Not everything you need to know is visible — trust what you feel even if you can't explain it.",future:"The answer you're looking for will arrive once you stop searching for it with your mind and start listening with your body and intuition."},
  {n:"The Empress",s:"III",past:"There was a period of abundance, creativity, or intense care for others — and that time planted seeds that are still growing.",present:"You have the energy to create and nurture. Whether it's a project, a relationship, or your own wellbeing — the Empress says you have what it takes.",future:"A period of flourishing is coming. What you've patiently cared for is going to bear visible fruit. Keep watering it."},
  {n:"The Emperor",s:"IV",past:"You made firm decisions that built a solid foundation. It wasn't all easy, but you're the one who built that stability.",present:"You need more structure and clarity in some area of your life. Not everything can stay up in the air — choose one priority and commit to it.",future:"The stability you're looking for comes from within, not from outside. Once you set clear boundaries and firm decisions, everything else falls into place."},
  {n:"The Hierophant",s:"V",past:"You learned from someone or some tradition that shaped you in ways you still carry — some of it serves you, some of it you're now reexamining.",present:"You might be questioning something you used to believe in — a rule, a system, an institution. It's valid to ask what's still yours and what no longer is.",future:"You'll find guidance through a teacher, a community, or a teaching that gives you exactly the framework you need. Stay open."},
  {n:"The Lovers",s:"VI",past:"There was an important choice — maybe between two paths, two people, or two versions of yourself. That decision defined you more than you realize.",present:"You're facing a real choice. It's not just about romantic love — it could be between values, between what you want and what you feel you should do, between staying or moving on.",future:"The decision you make soon will come from the heart, not from logic. And that's okay — some choices are only made well when love makes them."},
  {n:"The Chariot",s:"VII",past:"You overcame something that seemed impossible through sheer determination. That victory showed you what you're capable of when you focus.",present:"You have the strength to move forward, but you need clear direction. Speeding up does no good if you don't know exactly where you're going.",future:"An important achievement is approaching. It requires you to keep your emotions in check and stay on course even if the road gets hard."},
  {n:"Strength",s:"VIII",past:"You went through something that demanded more patience and self-control than it seemed. It wasn't weakness — it was a different kind of strength than you were used to.",present:"The situation you're facing now won't be solved with brute force but with calm, compassion, and inner steadiness. You have more of that than you think.",future:"Your greatest strength in what's coming won't be toughness but gentleness — with yourself and with others. That's what will make the difference."},
  {n:"The Hermit",s:"IX",past:"There was a period of solitude or withdrawal — chosen or not — that taught you things about yourself that only silence can reveal.",present:"You need time for yourself, even if it feels like a luxury you can't afford. The answer you're looking for isn't out there — it's in a moment of honest stillness.",future:"A period of reflection is approaching. Don't see it as isolation but as the preparation you need for the next chapter of your story."},
  {n:"Wheel of Fortune",s:"X",past:"You've lived through cycles of ups and downs that taught you nothing is permanent — neither the good nor the bad. That lesson is worth more than it seems.",present:"Something is changing in your life, even if you can't see it clearly yet. The Wheel's shifts don't always announce themselves — they simply happen.",future:"An important turn is coming. It could be in your favor or it could be a challenge — either way, you're better prepared to meet it than you think."},
  {n:"Justice",s:"XI",past:"Something from the past reached its fair consequence, for better or worse. Life balanced a scale that needed adjusting.",present:"A situation in your life is calling for honesty and balance. If you're taking more than you give, or giving more than you receive, Justice is asking you to correct it.",future:"What you give now will come back to you. Justice doesn't punish or reward — it simply balances. Act with integrity and the outcome will be fair."},
  {n:"The Hanged Man",s:"XII",past:"There was a time when things came to a halt and you had to wait, even though you hated waiting. That pause had a purpose you may be able to see now.",present:"You're in a pause — chosen or forced. Instead of fighting it, use it to see things from a different angle. There's something you're not seeing.",future:"The situation that feels stuck is going to move, but on its own timing, not yours. The key now is to let go of control and trust the process."},
  {n:"Death",s:"XIII",past:"Something ended that needed to end, even if it hurt. That ending made room for what came after — something that couldn't have arrived any other way.",present:"You're in the middle of a transformation. Something has to die for something new to be born — it could be a relationship, a version of yourself, or a way of doing things.",future:"An important ending is approaching, but don't meet it with fear. What comes after is better than what's ending — even if you can't see it yet."},
  {n:"Temperance",s:"XIV",past:"You learned to blend opposites — emotion and reason, speed and patience — in ways that gave you a balance you didn't have before.",present:"The situation you're facing calls for moderation and patience. This isn't a moment for extremes — neither giving up nor forcing things. The middle path is the most powerful one right now.",future:"What you're after will come with time, patience, and the right mix of effort and letting go. Not everything has to happen right now. Trust the gradual process."},
  {n:"The Devil",s:"XV",past:"There was something — a person, a habit, a situation — that had more power over you than it should have. Recognizing that was the first step to freeing yourself.",present:"You might be in a situation where you feel like you have no options, or that something has you trapped. The truth is you have more power than you think — you just have to see it.",future:"You'll free yourself from something that's been limiting you. The first step is recognizing the chain exists — the second is realizing you can take it off."},
  {n:"The Tower",s:"XVI",past:"Something collapsed unexpectedly — a plan, a relationship, a certainty. That collapse was painful but necessary to build something more real.",present:"You might feel like something in your life is about to shift abruptly, or that something you thought was solid is starting to shake. Resist the urge to hold on to what's already falling.",future:"An unexpected change is coming. You can't avoid it, but you can decide how you'll respond. Towers fall to reveal what was true underneath it all."},
  {n:"The Star",s:"XVII",past:"After something difficult, you found a spark of hope that didn't go out even in the darkest moment. That spark is what brought you here.",present:"You're in a moment of renewal and healing, even if it doesn't feel like it yet. There are real reasons for hope — look for the small but concrete ones.",future:"A period of calm and clarity is coming after what you've been through. The Star doesn't promise everything will be perfect — it promises there will be light, and that it will be enough."},
  {n:"The Moon",s:"XVIII",past:"There was a period of confusion, fears, or illusions that was hard to get through. You might still be processing some of the lessons it left behind.",present:"Things aren't entirely what they seem right now. There's something hidden, or something you're not seeing clearly. Don't make big decisions until the fog clears.",future:"The current confusion is temporary. Once the Moon passes, you'll see what's happening with far more clarity, and you'll know exactly what to do."},
  {n:"The Sun",s:"XIX",past:"There was a moment of great joy, achievement, or clarity that reminded you what it feels like when things flow and everything makes sense.",present:"There's more to celebrate in your life than you're giving yourself credit for. The Sun's energy asks you to see the good — not because the hard stuff isn't real, but because the good is real too.",future:"A period of vitality, clarity, and visible success is coming. Not everything will resolve at once, but the direction is upward and forward. Hold onto that energy."},
  {n:"Judgement",s:"XX",past:"You had an important realization or a moment of honesty with yourself that changed how you see yourself and your story.",present:"There's an inner calling you're listening to, or that you need to listen to. It's not about what others expect of you — it's about what you know you have to do.",future:"Soon you'll have new clarity about your purpose or direction. When that realization comes, don't ignore it even if it's uncomfortable — it's guiding you toward something important."},
  {n:"The World",s:"XXI",past:"You completed something significant — a cycle, a lesson, a chapter of life. That achievement is worth more credit than you're giving it.",present:"You're close to completing something important. Don't give up now — the finish line is closer than it looks.",future:"An important cycle is about to close in a satisfying way. What you've built and learned has brought you exactly where you needed to be. The next cycle begins from a wiser place."},
];

function drawTarot(language) {
  const deck = language === "en" ? TAROT_EN : TAROT;
  return [...deck].sort(() => Math.random() - 0.5).slice(0, 3);
}

// ── COMPATIBILIDAD PREGENERADA ───────────────────────────
const COMPAT_MATRIX={Fuego:{Fuego:90,Tierra:45,Aire:85,Agua:40},Tierra:{Fuego:45,Tierra:80,Aire:55,Agua:75},Aire:{Fuego:85,Tierra:55,Aire:75,Agua:60},Agua:{Fuego:40,Tierra:75,Aire:60,Agua:85}};
const ELEM={Aries:"Fuego",Tauro:"Tierra",Géminis:"Aire",Cáncer:"Agua",Leo:"Fuego",Virgo:"Tierra",Libra:"Aire",Escorpio:"Agua",Sagitario:"Fuego",Capricornio:"Tierra",Acuario:"Aire",Piscis:"Agua"};
const SIGNS_LIST=[{name:"Aries",glyph:"♈",color:"#e04060"},{name:"Tauro",glyph:"♉",color:"#30d0b0"},{name:"Géminis",glyph:"♊",color:"#f0c040"},{name:"Cáncer",glyph:"♋",color:"#9b6dff"},{name:"Leo",glyph:"♌",color:"#f0c040"},{name:"Virgo",glyph:"♍",color:"#30d0b0"},{name:"Libra",glyph:"♎",color:"#e056a0"},{name:"Escorpio",glyph:"♏",color:"#e04060"},{name:"Sagitario",glyph:"♐",color:"#9b6dff"},{name:"Capricornio",glyph:"♑",color:"#9080b0"},{name:"Acuario",glyph:"♒",color:"#40c8f0"},{name:"Piscis",glyph:"♓",color:"#9b6dff"}];

function oppositeSign(sign){
  const idx=SIGNS_LIST.findIndex(s=>s.name===sign);
  return idx<0?sign:SIGNS_LIST[(idx+6)%12].name;
}
function hashPair(a,b){
  const str=(a||"")+"-"+(b||"");
  let h=0;for(let i=0;i<str.length;i++){h=(h*31+str.charCodeAt(i))|0;}
  return Math.abs(h);
}
// Deterministic per-pair breakdown of the overall score into 5 relationship categories,
// so the same two signs always show the same bars instead of jumping around on every click.
function getCompatCategories(score,s1,s2){
  const h=hashPair(s1,s2);
  const off=(n)=>((h>>(n*4))%13)-6;
  const clamp=(v)=>Math.min(98,Math.max(28,Math.round(v)));
  return {
    love:clamp(score+off(0)),
    emotional:clamp(score+off(1)),
    communication:clamp(score+off(2)),
    trust:clamp(score+off(3)),
    intimacy:clamp(score+off(4)),
  };
}
const KARMIC_ROLE_EN={Sol:"Sun",Luna:"Moon",Ascendente:"Ascendant"};
// Looks for the other person's Sun/Moon/Ascendant landing on your Lilith or Lunar Nodes (and
// vice versa) — the classic astrological markers of a "karmic" pull between two charts.
function getKarmicInsight(myChart,theirChart,language){
  if(!myChart||!theirChart)return null;
  const isEn=language==="en";
  const myNN=myChart.nnSign,myNS=oppositeSign(myNN),myLil=myChart.lilithSign;
  const theirNN=theirChart.nnSign,theirNS=oppositeSign(theirNN),theirLil=theirChart.lilithSign;
  const myPts=[{role:"Sol",sign:myChart.planets.Sol.sign},{role:"Luna",sign:myChart.planets.Luna.sign},{role:"Ascendente",sign:myChart.ascSign}];
  const theirPts=[{role:"Sol",sign:theirChart.planets.Sol.sign},{role:"Luna",sign:theirChart.planets.Luna.sign},{role:"Ascendente",sign:theirChart.ascSign}];
  const roleLabel=(role)=>isEn?KARMIC_ROLE_EN[role]:role;
  const hits=[];
  for(const p of theirPts){
    const r=roleLabel(p.role),sg=signLabel(p.sign,language);
    if(p.sign===myNN)hits.push(isEn?`Their ${r} falls on your North Node (${sg}) — this connection can push you toward real personal growth.`:`Su ${r} cae en tu Nodo Norte (${sg}) — esta conexión puede empujarte hacia un crecimiento real.`);
    if(p.sign===myNS)hits.push(isEn?`Their ${r} falls on your South Node (${sg}) — it feels deeply familiar, possibly a repeated pattern from the past.`:`Su ${r} cae en tu Nodo Sur (${sg}) — se siente muy familiar, posiblemente un patrón repetido del pasado.`);
    if(p.sign===myLil)hits.push(isEn?`Their ${r} falls on your Lilith (${sg}) — intense, magnetic attraction with a real risk of unhealthy dependency.`:`Su ${r} cae en tu Lilith (${sg}) — atracción intensa y magnética, con riesgo real de dependencia poco sana.`);
  }
  for(const p of myPts){
    const r=roleLabel(p.role),sg=signLabel(p.sign,language);
    if(p.sign===theirNN)hits.push(isEn?`Your ${r} falls on their North Node (${sg}) — you may be the one pushing their growth.`:`Tu ${r} cae en su Nodo Norte (${sg}) — puedes ser quien empuje su crecimiento.`);
    if(p.sign===theirNS)hits.push(isEn?`Your ${r} falls on their South Node (${sg}) — old, familiar territory for them.`:`Tu ${r} cae en su Nodo Sur (${sg}) — territorio viejo y familiar para esa persona.`);
    if(p.sign===theirLil)hits.push(isEn?`Your ${r} falls on their Lilith (${sg}) — you trigger something raw and instinctive in them.`:`Tu ${r} cae en su Lilith (${sg}) — despiertas algo crudo e instintivo en esa persona.`);
  }
  const level=hits.length>=3?"alta":hits.length>=1?"media":"baja";
  return{level,hits};
}

const COMPAT_TEXTS = {
  "Fuego-Fuego": {quimica:"Hay una chispa inmediata entre ustedes dos. La energía es alta, el ritmo es similar y la motivación mutua puede ser increíble. El riesgo es que dos fuegos juntos pueden incendiarse — si no hay espacio para que cada uno brille individualmente, la competencia puede aparecer.", desafio:"Necesitan aprender a no apagar el fuego del otro con el propio. Cuando los dos quieren ser el centro, nadie gana. La clave es apoyarse en los logros mutuos, no competir.", potencial:"Si canalizan esa energía hacia metas comunes, son imparables. Una pareja de fuego puede construir cosas extraordinarias juntos cuando van en la misma dirección.", consejo:"Celebren los logros del otro como si fueran propios. Eso convierte la competencia en equipo."},
  "Fuego-Tierra": {quimica:"La atracción existe pero viene de la diferencia. El fuego admira la solidez de la tierra; la tierra se siente viva con la energía del fuego. El problema es que esa misma diferencia puede generar fricción con el tiempo.", desafio:"El fuego puede sentir que la tierra frena sus planes; la tierra puede sentir que el fuego es impulsivo e inestable. Necesitan entender que ninguno está equivocado — simplemente tienen ritmos diferentes.", potencial:"Si logran complementarse, son una combinación poderosa: el fuego pone la visión y la energía; la tierra pone la estructura y la paciencia para convertir los sueños en realidad.", consejo:"Antes de tomar decisiones juntos, hablen de los tiempos. El fuego necesita movimiento; la tierra necesita seguridad. Pueden tener los dos si lo negocian bien."},
  "Fuego-Aire": {quimica:"Esta combinación tiene una energía natural muy buena. El aire alimenta al fuego y el fuego le da propósito al aire. La conversación fluye, las ideas se potencian y hay una chispa intelectual que mantiene el interés.", desafio:"Ninguno de los dos tiene mucha paciencia para los detalles o para las emociones profundas. Pueden conectar en la mente pero desconectarse en el corazón si no trabajan esa parte.", potencial:"Son la pareja que se estimula mutuamente, que crece junta y que no se aburre. Si agregan profundidad emocional a su conexión, tienen todo para funcionar a largo plazo.", consejo:"No huyan de las conversaciones difíciles o emocionales. La profundidad que evitan es la que va a fortalecer la relación."},
  "Fuego-Agua": {quimica:"La atracción es intensa y casi magnética, pero la dinámica es complicada. El fuego y el agua se atraen precisamente por ser opuestos, y esa tensión puede ser apasionante o agotadora dependiendo de cómo la manejen.", desafio:"El fuego puede sentir que el agua es demasiado emocional o demandante; el agua puede sentir que el fuego es insensible o egoísta. Ninguno entiende naturalmente al otro.", potencial:"Si se toman el tiempo de entender cómo funciona el otro, pueden tener una conexión profundísima. El fuego le da energía al agua; el agua le da profundidad emocional al fuego.", consejo:"Antes de reaccionar, pregúntense qué necesita el otro en este momento — no qué necesitarían ustedes en su lugar. Esa distinción lo cambia todo."},
  "Tierra-Tierra": {quimica:"Hay una comprensión natural entre ustedes. Comparten valores similares, ritmos parecidos y una forma de ver la vida que hace que estar juntos se sienta seguro y cómodo.", desafio:"El riesgo es el estancamiento. Dos tierras pueden caer en rutinas tan estables que pierden la emoción y el crecimiento. La comodidad se convierte en conformismo si no tienen cuidado.", potencial:"Son la pareja con más potencial de construir algo sólido y duradero. La estabilidad que ofrecen mutuamente es una base poderosa para una vida compartida.", consejo:"Planeen aventuras, retos o cambios periódicos en su rutina. La estabilidad es un activo; el aburrimiento es una amenaza que pueden prevenir."},
  "Tierra-Aire": {quimica:"Son bastante diferentes en su forma de ver la vida y eso puede ser fascinante al principio. La tierra aprecia la mente del aire; el aire admira la solidez de la tierra.", desafio:"La tierra puede sentir que el aire es inconstante o poco comprometido; el aire puede sentir que la tierra es demasiado rígida o resistente al cambio. Necesitan mucha comunicación.", potencial:"Si se respetan las diferencias, pueden complementarse muy bien. La tierra le da raíces al aire; el aire le da perspectiva y movimiento a la tierra.", consejo:"Acepta que el otro tiene una inteligencia diferente a la tuya, no inferior. Eso es lo que hace la relación enriquecedora."},
  "Tierra-Agua": {quimica:"Esta combinación tiene una armonía natural. La tierra contiene al agua y le da forma; el agua nutre a la tierra y la hace fértil. Se entienden emocionalmente más de lo que creen.", desafio:"El agua puede desbordarse emocionalmente más de lo que la tierra puede manejar; la tierra puede parecer fría o distante cuando el agua necesita más apoyo emocional.", potencial:"Son una de las combinaciones más compatibles del zodiaco. Comparten valores de seguridad, lealtad y profundidad. Con comunicación, pueden construir algo muy sólido.", consejo:"Tierra: expresa lo que sientes aunque no tengas palabras perfectas. Agua: dale espacio a la tierra para procesar — no todo tiene que ser inmediato."},
  "Aire-Aire": {quimica:"La conexión mental es inmediata y poderosa. Hablan el mismo idioma, se entienden sin esfuerzo y la conversación puede durar horas sin que ninguno se aburra.", desafio:"Dos aires pueden quedarse solo en la cabeza y nunca aterrizar en lo concreto. Las decisiones se postergan, los compromisos se evitan y la relación puede sentirse como eterna posibilidad sin nada real.", potencial:"Si agregan acción concreta a todas esas ideas brillantes, son una pareja extraordinaria — con la mente más poderosa entre todas las combinaciones del zodiaco.", consejo:"Pongan fechas y compromisos concretos. Las ideas sin acción son solo conversación. El amor también necesita aterrizarse."},
  "Aire-Agua": {quimica:"Se atraen porque se sienten incompletos en lo que el otro tiene de sobra. El agua le da profundidad emocional al aire; el aire le da perspectiva y ligereza al agua.", desafio:"El aire puede sentir que el agua es demasiado intensa o demandante emocionalmente; el agua puede sentir que el aire es frívolo o no comprometido con lo que siente.", potencial:"Si aprenden a valorar lo que el otro aporta, pueden tener una conexión muy completa — mente y corazón en equilibrio. Ese es el sueño de ambos aunque no lo sepan.", consejo:"Aire: tómate más en serio las emociones del agua, aunque no las entiendas. Agua: confía en que el aire te quiere aunque no lo demuestre como tú esperas."},
  "Agua-Agua": {quimica:"La conexión emocional es profunda e inmediata. Se entienden sin palabras, sienten lo que el otro siente y hay una intimidad natural que pocas combinaciones tienen.", desafio:"Dos aguas pueden ahogarse mutuamente. Si los dos están mal al mismo tiempo, no hay quien ponga el piso. La codependencia es el riesgo más grande de esta combinación.", potencial:"Si mantienen su individualidad dentro de la profundidad que comparten, pueden tener una de las conexiones más íntimas y significativas del zodiaco.", consejo:"Asegúrense de tener amigos, hobbies e intereses fuera de la relación. El amor no puede ser el único ancla de ninguno de los dos."},
};

// Element names stay in Spanish as object keys (matching ELEM[sign] lookups elsewhere in the
// file) even in the English table, since getCompatText() builds the key from ELEM[s1]/ELEM[s2].
const COMPAT_TEXTS_EN = {
  "Fuego-Fuego": {quimica:"There's an instant spark between you two. The energy is high, your pace matches, and the mutual motivation can be incredible. The risk is that two fires together can burn out of control — if there isn't room for each of you to shine individually, competition can creep in.", desafio:"You need to learn not to put out each other's fire with your own. When you both want to be the center of attention, nobody wins. The key is leaning on each other's wins instead of competing over them.", potencial:"If you channel that energy toward shared goals, you're unstoppable. A fire-fire couple can build extraordinary things together once they're pointed in the same direction.", consejo:"Celebrate each other's wins as if they were your own. That's what turns competition into teamwork."},
  "Fuego-Tierra": {quimica:"The attraction is real, and it comes from your differences. Fire admires earth's steadiness; earth feels alive next to fire's energy. The catch is that same difference can create friction over time.", desafio:"Fire might feel like earth is holding back their plans; earth might feel like fire is impulsive and unstable. You need to understand that neither of you is wrong — you just move at different speeds.", potencial:"If you manage to complement each other, you're a powerful combination: fire brings the vision and the energy; earth brings the structure and patience to turn dreams into reality.", consejo:"Before making decisions together, talk about timing. Fire needs movement; earth needs security. You can have both if you negotiate it well."},
  "Fuego-Aire": {quimica:"This combination has a naturally great energy. Air feeds fire, and fire gives air a sense of purpose. Conversation flows, ideas build on each other, and there's an intellectual spark that keeps things interesting.", desafio:"Neither of you has much patience for details or deep emotions. You can connect in the mind but disconnect in the heart if you don't work on that side of things.", potencial:"You're the couple that keeps each other stimulated, grows together, and never gets bored. Add emotional depth to your connection and you have everything you need to last.", consejo:"Don't run from hard or emotional conversations. The depth you're avoiding is exactly what will make the relationship stronger."},
  "Fuego-Agua": {quimica:"The attraction is intense, almost magnetic, but the dynamic is complicated. Fire and water are drawn to each other precisely because they're opposites, and that tension can be exhilarating or exhausting depending on how you handle it.", desafio:"Fire might feel like water is too emotional or demanding; water might feel like fire is insensitive or selfish. Neither of you naturally understands the other.", potencial:"If you take the time to understand how the other one works, you can have an incredibly deep connection. Fire gives water energy; water gives fire emotional depth.", consejo:"Before reacting, ask yourselves what the other person needs right now — not what you would need in their place. That distinction changes everything."},
  "Tierra-Tierra": {quimica:"There's a natural understanding between you. You share similar values, similar paces, and a way of seeing life that makes being together feel safe and comfortable.", desafio:"The risk is stagnation. Two earth signs can fall into routines so stable they lose the spark and stop growing. Comfort turns into complacency if you're not careful.", potencial:"You're the couple with the most potential to build something solid and lasting. The stability you offer each other is a powerful foundation for a life together.", consejo:"Plan adventures, challenges, or periodic changes to your routine. Stability is an asset; boredom is a threat you can prevent."},
  "Tierra-Aire": {quimica:"You're quite different in how you see life, and that can be fascinating at first. Earth admires air's mind; air admires earth's groundedness.", desafio:"Earth might feel like air is inconsistent or uncommitted; air might feel like earth is too rigid or resistant to change. You'll need a lot of communication.", potencial:"If you respect each other's differences, you can complement each other very well. Earth gives air roots; air gives earth perspective and movement.", consejo:"Accept that the other person has a different kind of intelligence than yours, not a lesser one. That's what makes the relationship enriching."},
  "Tierra-Agua": {quimica:"This combination has a natural harmony. Earth holds water and gives it shape; water nourishes earth and makes it fertile. You understand each other emotionally more than you realize.", desafio:"Water can overflow emotionally more than earth can handle; earth can come across as cold or distant when water needs more emotional support.", potencial:"You're one of the most compatible combinations in the zodiac. You share values of security, loyalty, and depth. With communication, you can build something very solid.", consejo:"Earth: express what you feel even if you don't have the perfect words. Water: give earth space to process — not everything has to happen immediately."},
  "Aire-Aire": {quimica:"The mental connection is instant and powerful. You speak the same language, understand each other effortlessly, and conversation can go on for hours without either of you getting bored.", desafio:"Two air signs can stay stuck in their heads and never land on anything concrete. Decisions get postponed, commitments get avoided, and the relationship can feel like endless possibility without anything real.", potencial:"If you add concrete action to all those brilliant ideas, you're an extraordinary couple — with arguably the sharpest minds of any combination in the zodiac.", consejo:"Set actual dates and commitments. Ideas without action are just conversation. Love needs to land somewhere real too."},
  "Aire-Agua": {quimica:"You're drawn to each other because you feel incomplete without what the other has in abundance. Water gives air emotional depth; air gives water perspective and lightness.", desafio:"Air might feel like water is too intense or emotionally demanding; water might feel like air is shallow or uncommitted to what they're feeling.", potencial:"If you learn to value what the other brings, you can have a very complete connection — mind and heart in balance. That's the dream for both of you, even if you don't realize it.", consejo:"Air: take water's emotions more seriously, even when you don't fully understand them. Water: trust that air loves you even if they don't show it the way you'd expect."},
  "Agua-Agua": {quimica:"The emotional connection is deep and immediate. You understand each other without words, feel what the other feels, and share a natural intimacy that few combinations have.", desafio:"Two water signs can drown each other. If you're both struggling at the same time, there's no one to hold steady ground. Codependency is the biggest risk in this combination.", potencial:"If you keep your individuality within the depth you share, you can have one of the most intimate and meaningful connections in the zodiac.", consejo:"Make sure you both have friends, hobbies, and interests outside the relationship. Love can't be the only anchor for either of you."},
};

function getCompatText(s1, s2, name1, name2, language) {
  const e1=ELEM[s1]||"Fuego", e2=ELEM[s2]||"Fuego";
  const key1=`${e1}-${e2}`, key2=`${e2}-${e1}`;
  const TABLE = language === "en" ? COMPAT_TEXTS_EN : COMPAT_TEXTS;
  let texts = TABLE[key1];
  let swapped = false;
  if (!texts) { texts = TABLE[key2]; swapped = true; }
  if (!texts) texts = TABLE["Fuego-Fuego"];

  // Si tenemos nombres reales, reemplazamos "Aire:"/"Agua:" etc por los nombres de cada persona.
  // IMPORTANTE: elemForS1 siempre es el elemento REAL de la persona 1 (e1), y elemForS2 el de
  // la persona 2 (e2) — esto NO depende de qué clave de texto se usó internamente (swapped solo
  // afecta qué párrafo pre-escrito se reutiliza, no a quién pertenece cada elemento real).
  if (name1 && name2) {
    const n1 = name1.split(" ")[0], n2 = name2.split(" ")[0];
    const replaced = {};
    for (const [k, v] of Object.entries(texts)) {
      let t = v;
      t = t.replace(new RegExp(`\\b${e1}:\\s`, "g"), `${n1}: `);
      t = t.replace(new RegExp(`\\b${e2}:\\s`, "g"), `${n2}: `);
      replaced[k] = t;
    }
    return replaced;
  }

  return texts;
}

// ── SIGNOS COMPATIBLES ──────────────────────────────────
const SIGN_ELEM_M={Aries:"Fuego",Tauro:"Tierra",Géminis:"Aire",Cáncer:"Agua",Leo:"Fuego",Virgo:"Tierra",Libra:"Aire",Escorpio:"Agua",Sagitario:"Fuego",Capricornio:"Tierra",Acuario:"Aire",Piscis:"Agua"};
const ELEM_SIGNS_M={Fuego:["Aries","Leo","Sagitario"],Tierra:["Tauro","Virgo","Capricornio"],Aire:["Géminis","Libra","Acuario"],Agua:["Cáncer","Escorpio","Piscis"]};
const ELEM_COMPAT_M={Fuego:["Fuego","Aire"],Tierra:["Tierra","Agua"],Aire:["Aire","Fuego"],Agua:["Agua","Tierra"]};
const INTENSITY_LABELS={alta:{label:"Alta compatibilidad",color:"#30d080"},media:{label:"Complementaria",color:"#f0c040"},intensa:{label:"Muy intensa",color:"#e04060"},peligro:{label:"Fascinante · Cuidado",color:"#9b6dff"}};

function buildCompatibleSignsData(chart) {
  const h=(n)=>signOf(chart.cusps[n-1]);
  const ve=chart.planets.Venus, ma=chart.planets.Marte;
  const veEl=SIGN_ELEM_M[ve.sign]||"Fuego";
  const maEl=SIGN_ELEM_M[ma.sign]||"Fuego";
  const veCompatSigns=[...ELEM_SIGNS_M[ELEM_COMPAT_M[veEl]?.[0]]||[],...ELEM_SIGNS_M[ELEM_COMPAT_M[veEl]?.[1]]||[]].filter(s=>s!==ve.sign).slice(0,3);
  const maCompatSigns=(ELEM_SIGNS_M[ELEM_COMPAT_M[maEl]?.[0]]||[]).filter(s=>s!==ma.sign);

  const HOUSE_DESCS = {
    7: (s) => `${s} en tu Casa 7 (la casa de las parejas) describe a tu compañero de vida ideal. Personas con Sol, Luna o Ascendente en ${s} activan esta energía naturalmente. Busca esa calma que sientes cuando alguien te complementa sin competir contigo.`,
    5: (s) => `Tu Casa 5 en ${s} es la energía del romance y la diversión. Personas ${s} te sacan esa versión tuya que se divierte, coquetea y disfruta sin presión. El romance se siente ligero y natural con ellos.`,
    4: (s) => `Con ${s} en tu Casa 4, una persona con esa energía puede ser con quien construyas un hogar real — convivencia, rutinas compartidas, estabilidad emocional. No tiene que ser el más apasionado, pero sí el más seguro.`,
    2: (s) => `${s} en tu Casa 2 habla de complemento material y de valores. Una pareja con esa energía puede compartir tu visión del dinero, de la seguridad y de lo que importa. La relación tiene una base práctica sólida.`,
    8: (s) => `Tu Casa 8 en ${s} es la zona de la intimidad profunda y la transformación. Con una persona ${s} puede haber una intensidad sexual y emocional que te cambia por dentro. Es poderoso, pero también exige madurez emocional de ambos lados.`,
    11: (s) => `Con ${s} en tu Casa 11, el amor puede llegar de contextos de amistad o grupos sociales. Personas ${s} pueden empezar como amigos y volverse algo más importante con el tiempo.`,
  };

  const findings = [
    {sign:h(7),houseNum:7,theme:"Matrimonio y pareja estable",icon:"💍",color:"#e056a0",intensity:"alta",desc:HOUSE_DESCS[7](h(7))},
    {sign:h(5),houseNum:5,theme:"Romance y atracción",icon:"💕",color:"#f0c040",intensity:"alta",desc:HOUSE_DESCS[5](h(5))},
    {sign:h(4),houseNum:4,theme:"Hogar y convivencia",icon:"🏡",color:"#30d0b0",intensity:"media",desc:HOUSE_DESCS[4](h(4))},
    {sign:h(2),houseNum:2,theme:"Valores y apoyo material",icon:"💎",color:"#40c8f0",intensity:"media",desc:HOUSE_DESCS[2](h(2))},
    {sign:h(8),houseNum:8,theme:"Intimidad profunda",icon:"🔥",color:"#e04060",intensity:"intensa",desc:HOUSE_DESCS[8](h(8))},
    {sign:chart.lilithSign,houseNum:chart.lilithHouse,theme:"Atracción oscura — Lilith",icon:"🌑",color:"#9b6dff",intensity:"peligro",desc:`Tu Lilith en ${chart.lilithSign} (Casa ${chart.lilithHouse}) es tu atracción más prohibida. Personas con esa energía pueden generarte una fascinación muy intensa, pero también codependencia o patrones que te hacen daño. Entra con los ojos abiertos.`},
    {sign:ve.sign,houseNum:ve.house,theme:"Amor natural — tu Venus",icon:"♀",color:"#e056a0",intensity:"alta",desc:`Tu Venus en ${ve.sign} (Casa ${ve.house}) define cómo amas y qué te atrae de forma natural. Personas con mucho ${veEl} en su carta — especialmente ${veCompatSigns.join(", ")} — fluyen contigo sin esfuerzo.`},
    {sign:ma.sign,houseNum:ma.house,theme:"Atracción física — tu Marte",icon:"♂",color:"#f0a030",intensity:"alta",desc:`Marte en ${ma.sign} (Casa ${ma.house}) es tu atracción física y sexual. Hay chispa natural con personas ${maEl}: ${maCompatSigns.slice(0,2).join(", ")}. También con quien tiene Marte o Ascendente en ${ma.sign}.`},
    {sign:chart.nnSign,houseNum:null,theme:"Crecimiento kármico — Nodo Norte",icon:"☊",color:"#30d0b0",intensity:"media",desc:`Tu Nodo Norte en ${chart.nnSign} señala el tipo de relaciones que más te hacen crecer. Una pareja ${chart.nnSign} puede resultarte diferente o desafiante al principio, pero es exactamente la energía que tu alma vino a integrar en esta vida.`},
    {sign:h(11),houseNum:11,theme:"Del amigo al amor",icon:"🤝",color:"#9b6dff",intensity:"media",desc:HOUSE_DESCS[11](h(11))},
  ];
  return findings;
}

// ── UI ATOMS ─────────────────────────────────────────────
function Pill({children,color=C.violet,style={}}){return <span style={{background:`${color}22`,border:`1px solid ${color}55`,color,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700,...style}}>{children}</span>;}
function Card({children,style={},onClick}){return <div onClick={onClick} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:16,...style,cursor:onClick?"pointer":"default"}}>{children}</div>;}
function GoldBtn({children,onClick,disabled,style={}}){const[h,setH]=useState(false);return <button onClick={onClick} disabled={disabled} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{background:disabled?C.mutedDark:h?C.goldDim:C.gold,color:disabled?C.muted:"#1a0d00",border:"none",borderRadius:24,padding:"11px 22px",fontWeight:700,fontSize:14,cursor:disabled?"not-allowed":"pointer",transition:"background 0.15s",fontFamily:"inherit",...style}}>{children}</button>;}
function GhostBtn({children,onClick,active,style={}}){return <button onClick={onClick} style={{background:active?`${C.violet}22`:"transparent",color:active?C.violet:C.muted,border:`1px solid ${active?C.violetDim:C.border}`,borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",...style}}>{children}</button>;}

// ── CITY SEARCH ──────────────────────────────────────────
function CitySearch({value,onChange}){
  const{t}=useLanguage();
  const[input,setInput]=useState(value?`${value.n}, ${value.c}`:"");
  const[sugg,setSugg]=useState([]);
  function handle(v){setInput(v);setSugg(v.length>=2?searchCities(v):[]);if(value)onChange(null);}
  function pick(c){setInput(`${c.n}, ${c.c}`);setSugg([]);onChange(c);}
  return <div style={{position:"relative"}}>
    <input value={input} onChange={e=>handle(e.target.value)} placeholder={t("citySearchPlaceholder")} style={{width:"100%",background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 14px",color:C.white,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}} />
    {sugg.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:50,background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginTop:4,boxShadow:"0 8px 24px rgba(0,0,0,0.5)"}}>
      {sugg.map((c,i)=><div key={i} onClick={()=>pick(c)} style={{padding:"10px 14px",cursor:"pointer",display:"flex",gap:10,borderBottom:i<sugg.length-1?`1px solid ${C.border}`:"none"}} onMouseEnter={e=>e.currentTarget.style.background=`${C.violet}20`} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <span>📍</span><div><div style={{fontSize:13,fontWeight:700,color:C.white}}>{c.n}</div><div style={{fontSize:11,color:C.muted}}>{c.c}</div></div>
      </div>)}
    </div>}
    {input.length>=2&&sugg.length===0&&!value&&<p style={{color:C.warn,fontSize:11,marginTop:6}}>{t("citySearchNotFound")}</p>}
    {value&&<div style={{marginTop:8,background:`${C.success}15`,border:`1px solid ${C.success}44`,borderRadius:10,padding:"8px 12px"}}><span style={{fontSize:12,color:C.success,fontWeight:700}}>✓ {value.n}, {value.c}</span></div>}
  </div>;
}

// ── PERFIL FORM ──────────────────────────────────────────
const AVATARS = [
  // Mujer
  { id:"f1", emoji:"👩🏻", label:"Mujer" },
  { id:"f2", emoji:"👩🏼", label:"Mujer" },
  { id:"f3", emoji:"👩🏽", label:"Mujer" },
  { id:"f4", emoji:"👩🏾", label:"Mujer" },
  { id:"f5", emoji:"👩🏿", label:"Mujer" },
  { id:"f6", emoji:"👱🏻‍♀️", label:"Mujer" },
  { id:"f7", emoji:"👱🏼‍♀️", label:"Mujer" },
  { id:"f8", emoji:"👩🏻‍🦰", label:"Mujer" },
  { id:"f9", emoji:"👩🏻‍🦱", label:"Mujer" },
  { id:"f10", emoji:"👩🏾‍🦱", label:"Mujer" },
  // Hombre
  { id:"m1", emoji:"👨🏻", label:"Hombre" },
  { id:"m2", emoji:"👨🏼", label:"Hombre" },
  { id:"m3", emoji:"👨🏽", label:"Hombre" },
  { id:"m4", emoji:"👨🏾", label:"Hombre" },
  { id:"m5", emoji:"👨🏿", label:"Hombre" },
  { id:"m6", emoji:"👱🏻‍♂️", label:"Hombre" },
  { id:"m7", emoji:"👱🏼‍♂️", label:"Hombre" },
  { id:"m8", emoji:"👨🏻‍🦰", label:"Hombre" },
  { id:"m9", emoji:"👨🏻‍🦱", label:"Hombre" },
  { id:"m10", emoji:"👨🏾‍🦱", label:"Hombre" },
  // Neutro
  { id:"n1", emoji:"🧑🏻", label:"Neutro" },
  { id:"n2", emoji:"🧑🏼", label:"Neutro" },
  { id:"n3", emoji:"🧑🏽", label:"Neutro" },
  { id:"n4", emoji:"🧑🏾", label:"Neutro" },
  { id:"n5", emoji:"🧑🏿", label:"Neutro" },
];

function PerfilForm({onSave}){
  const{t}=useLanguage();
  const[step,setStep]=useState(1);
  const[name,setName]=useState("");
  const[genero,setGenero]=useState("");
  const[avatar,setAvatar]=useState("");
  const[birthdate,setBirthdate]=useState("");
  const[birthtime,setBirthtime]=useState("12:00");
  const[city,setCity]=useState(null);
  const inp={width:"100%",background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",color:C.white,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
  function canGo(){if(step===1)return name.trim().length>1;if(step===2)return!!genero&&!!avatar;if(step===3)return!!(birthdate&&birthtime);if(step===4)return!!city;}
  function save(){onSave({name,genero,avatar,birthdate,birthtime,city:city.n,lat:city.lat,lon:city.lon});}
  return <div style={{padding:16}}>
    <div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:40,marginBottom:8}}>🌌</div><h2 style={{color:C.gold,fontSize:18,fontWeight:800,margin:"0 0 4px"}}>{t("perfilFormTitle")}</h2><p style={{color:C.muted,fontSize:12}}>{t("perfilFormSubtitle")}</p>
      <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:12}}>{[1,2,3,4].map(s=><div key={s} style={{width:24,height:24,borderRadius:"50%",background:step>=s?C.gold:C.mutedDark,color:step>=s?"#1a0d00":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{s}</div>)}</div>
    </div>
    <Card>
      {step===1&&<><div style={{fontSize:20,textAlign:"center",marginBottom:10}}>👤</div><h3 style={{color:C.white,fontSize:14,fontWeight:700,marginBottom:12,textAlign:"center"}}>{t("perfilStep1Title")}</h3><input value={name} onChange={e=>setName(e.target.value)} placeholder={t("perfilNamePlaceholder")} onKeyDown={e=>e.key==="Enter"&&canGo()&&setStep(2)} style={inp} autoFocus /></>}
      {step===2&&<>
        <div style={{fontSize:20,textAlign:"center",marginBottom:10}}>🎨</div>
        <h3 style={{color:C.white,fontSize:14,fontWeight:700,marginBottom:4,textAlign:"center"}}>{t("perfilStep2Title")}</h3>
        <p style={{color:C.muted,fontSize:11,textAlign:"center",marginBottom:14}}>{t("perfilStep2Subtitle")}</p>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:14}}>
          {[{val:"Mujer",key:"perfilGenderMujer"},{val:"Hombre",key:"perfilGenderHombre"},{val:"Neutro",key:"perfilGenderNeutro"}].map(g=>(
            <button key={g.val} onClick={()=>{setGenero(g.val);setAvatar("");}} style={{background:genero===g.val?`${C.gold}22`:"transparent",border:`1px solid ${genero===g.val?C.gold:C.border}`,borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:600,color:genero===g.val?C.gold:C.muted,cursor:"pointer",fontFamily:"inherit"}}>{t(g.key)}</button>
          ))}
        </div>
        {genero&&<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {AVATARS.filter(a=>a.label===genero).map(a=>(
            <button key={a.id} onClick={()=>setAvatar(a.emoji)} style={{background:avatar===a.emoji?`${C.gold}22`:C.bgDeep,border:`2px solid ${avatar===a.emoji?C.gold:C.border}`,borderRadius:14,padding:"12px 6px",cursor:"pointer",fontSize:28}}>{a.emoji}</button>
          ))}
        </div>}
      </>}
      {step===3&&<><div style={{fontSize:20,textAlign:"center",marginBottom:10}}>📅</div><h3 style={{color:C.white,fontSize:14,fontWeight:700,marginBottom:12,textAlign:"center"}}>{t("perfilStep3Title")}</h3>
        <label style={{fontSize:10,color:C.muted,fontWeight:600,display:"block",marginBottom:5}}>{t("perfilDateLabel")}</label>
        <input type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)} style={{...inp,colorScheme:"dark",marginBottom:12}} />
        <label style={{fontSize:10,color:C.muted,fontWeight:600,display:"block",marginBottom:5}}>{t("perfilTimeLabel")} <span style={{color:C.mutedDark,fontWeight:400}}>{t("perfilTimeHint")}</span></label>
        <input type="time" value={birthtime} onChange={e=>setBirthtime(e.target.value)} style={{...inp,colorScheme:"dark"}} />
        <div style={{marginTop:10,background:`${C.gold}10`,border:`1px solid ${C.goldDim}33`,borderRadius:10,padding:10}}><p style={{color:C.gold,fontSize:11,lineHeight:1.5}}>{t("perfilTimeNote")}</p></div>
      </>}
      {step===4&&<><div style={{fontSize:20,textAlign:"center",marginBottom:10}}>📍</div><h3 style={{color:C.white,fontSize:14,fontWeight:700,marginBottom:12,textAlign:"center"}}>{t("perfilStep4Title")}</h3><CitySearch value={city} onChange={setCity} /></>}
    </Card>
    <div style={{display:"flex",gap:10,marginTop:14}}>
      {step>1&&<GhostBtn onClick={()=>setStep(s=>s-1)} style={{flex:1}}>{t("perfilBack")}</GhostBtn>}
      {step<4?<GoldBtn onClick={()=>setStep(s=>s+1)} disabled={!canGo()} style={{flex:1}}>{t("perfilContinue")}</GoldBtn>:<GoldBtn onClick={save} disabled={!canGo()} style={{flex:1}}>{t("perfilCalculate")}</GoldBtn>}
    </div>
  </div>;
}

// ── ORACLE CARD ──────────────────────────────────────────
// ── BIORRITMO ────────────────────────────────────────────
// Cuenta días completos transcurridos entre dos fechas, ignorando la hora del día —
// así el resultado es estable sin importar a qué hora se abra la app o en qué zona horaria.
function daysSinceBirth(birthdateStr) {
  const [by, bm, bd] = birthdateStr.split("-").map(Number);
  const now = new Date();
  // Ambas fechas se anclan a mediodía LOCAL para evitar bordes de medianoche/UTC
  const birthLocalNoon = new Date(by, bm - 1, bd, 12, 0, 0);
  const todayLocalNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
  return Math.round((todayLocalNoon - birthLocalNoon) / (1000 * 60 * 60 * 24));
}

function calcBiorhythm(birthdate) {
  const days = daysSinceBirth(birthdate);
  return {
    fisico: Math.round(Math.sin(2 * Math.PI * days / 23) * 100),
    emocional: Math.round(Math.sin(2 * Math.PI * days / 28) * 100),
    intelectual: Math.round(Math.sin(2 * Math.PI * days / 33) * 100),
  };
}

function BiorhythmCard({ birthdate }) {
  const{t}=useLanguage();
  const bio = calcBiorhythm(birthdate);
  const items = [
    { label:t("biorhythmFisico"), value:bio.fisico, color:"#30d080" },
    { label:t("biorhythmEmocional"), value:bio.emocional, color:"#e056a0" },
    { label:t("biorhythmMental"), value:bio.intelectual, color:"#f0c040" },
  ];
  // Mini chart: 7 days
  const baseDays = daysSinceBirth(birthdate);
  const days7 = Array.from({length:7},(_,i)=>{
    const d = baseDays - 3 + i;
    return {
      day:i-3,
      f:Math.round(Math.sin(2*Math.PI*d/23)*100),
      e:Math.round(Math.sin(2*Math.PI*d/28)*100),
      m:Math.round(Math.sin(2*Math.PI*d/33)*100),
    };
  });
  const dayLabels=["","",t("biorhythmYesterday"),t("biorhythmTodayLabel"),"","",""];
  return (
    <div style={{margin:"0 16px 14px",background:"#1e1240",border:"1px solid #2e1f5e",borderRadius:16,padding:16}}>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:13,color:"#f8f4ff",fontWeight:700}}>{t("biorhythmTitle")}</div>
        <div style={{fontSize:11,color:"#9080b0",marginTop:2,lineHeight:1.4}}>{t("biorhythmDesc")}</div>
      </div>
      <div style={{display:"flex",gap:12,marginBottom:14}}>
        {items.map(item=>(
          <div key={item.label} style={{flex:1,background:"#0a0518",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:800,color:item.color}}>{item.value > 0 ? "+" : ""}{item.value}%</div>
            <div style={{fontSize:10,color:"#9080b0",marginTop:3}}>{item.label}</div>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div style={{display:"flex",gap:4,alignItems:"flex-end",height:60}}>
        {days7.map((d,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <div style={{width:"100%",display:"flex",flexDirection:"column",gap:1,height:48}}>
              {[{v:d.f,c:"#30d080"},{v:d.e,c:"#e056a0"},{v:d.m,c:"#f0c040"}].map((b,j)=>(
                <div key={j} style={{flex:1,background:"#0a0518",borderRadius:2,overflow:"hidden",position:"relative"}}>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,height:`${Math.max(0,(b.v+100)/2)}%`,background:b.c,opacity:i===3?1:0.4}} />
                </div>
              ))}
            </div>
            <div style={{fontSize:8,color:i===3?"#f0c040":"#4a3870",fontWeight:i===3?700:400}}>{i===3?t("biorhythmToday"):""}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:12,marginTop:10,justifyContent:"center"}}>
        {[{l:t("biorhythmFisico"),c:"#30d080"},{l:t("biorhythmEmocional"),c:"#e056a0"},{l:t("biorhythmMental"),c:"#f0c040"}].map(l=>(
          <div key={l.l} style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:l.c}} />
            <span style={{fontSize:9,color:"#9080b0"}}>{l.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FASES LUNARES DEL MES ────────────────────────────────
function getMonthMoonPhases() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthNames=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const phases = [];
  let prevPhase = null;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const diff = norm(moonLonOnDate(date) - sunLonOnDate(date));
    let phase = "";
    if (diff < 45) phase = "🌑";
    else if (diff < 90) phase = "🌒";
    else if (diff < 135) phase = "🌓";
    else if (diff < 180) phase = "🌔";
    else if (diff < 225) phase = "🌕";
    else if (diff < 270) phase = "🌖";
    else if (diff < 315) phase = "🌗";
    else phase = "🌘";
    if (phase !== prevPhase && [45,90,135,180,225,270,315].some(t=>Math.abs(diff-t)<5)) {
      const names={"🌑":"Luna Nueva","🌒":"Creciente","🌓":"Cuarto Creciente","🌔":"Gibosa","🌕":"Luna Llena","🌖":"Gibosa Men.","🌗":"Cuarto Menguante","🌘":"Menguante"};
      phases.push({ emoji: phase, name: names[phase], day: d, date: `${d} ${monthNames[month]}` });
    }
    prevPhase = phase;
  }
  return phases.slice(0, 4);
}

// ── PRÓXIMOS EVENTOS ASTRONÓMICOS ────────────────────────
function getUpcomingEvents(language) {
  const now = new Date();
  const events = [];

  // Mercury retrograde 2026 approximate dates
  const retroDates = [
    { start: new Date(2026,0,15), end: new Date(2026,1,7), planet:"Mercurio", sign:"Capricornio" },
    { start: new Date(2026,4,10), end: new Date(2026,5,3), planet:"Mercurio", sign:"Géminis" },
    { start: new Date(2026,8,12), end: new Date(2026,9,4), planet:"Mercurio", sign:"Libra" },
  ];

  // Venus retrograde 2026
  const venusRetro = { start: new Date(2026,6,22), end: new Date(2026,8,2), planet:"Venus", sign:"Leo" };

  // Full moons 2026 approximate
  const fullMoons = [
    new Date(2026,5,30), new Date(2026,6,29), new Date(2026,7,28),
    new Date(2026,8,26), new Date(2026,9,25), new Date(2026,10,24),
  ];

  // Solstices/Equinoxes
  const solstices = [
    { date: new Date(2026,5,21), name:"Solsticio de Verano", emoji:"☀️" },
    { date: new Date(2026,8,22), name:"Equinoccio de Otoño", emoji:"🍂" },
    { date: new Date(2026,11,22), name:"Solsticio de Invierno", emoji:"❄️" },
  ];

  // Cambios de signo de planetas lentos (eventos generacionales/anuales importantes)
  const signChanges = [
    { date: new Date(2026,5,30), planet:"Júpiter", sign:"Leo", emoji:"♃", color:"#f0c040",
      desc:"Júpiter entra en Leo y se queda un año completo. Es el planeta de la expansión y la buena suerte — durante este tránsito se favorece la creatividad, el liderazgo, la confianza y el reconocimiento público. Especialmente potente para los signos de fuego." },
  ];

  // Next sign change
  const nextSignChange = signChanges.find(s => s.date > now);
  if (nextSignChange) {
    const daysUntil = Math.ceil((nextSignChange.date - now) / (1000*60*60*24));
    events.push({
      date: nextSignChange.date,
      daysUntil,
      title: `${nextSignChange.planet} entra en ${signLabel(nextSignChange.sign, language)}`,
      desc: nextSignChange.desc,
      emoji: nextSignChange.emoji,
      color: nextSignChange.color,
    });
  }

  // Find next retro
  const nextRetro = retroDates.find(r => r.start > now);
  if (nextRetro) {
    const daysUntil = Math.ceil((nextRetro.start - now) / (1000*60*60*24));
    events.push({
      date: nextRetro.start,
      daysUntil,
      title: `${nextRetro.planet} Retrógrado en ${signLabel(nextRetro.sign, language)}`,
      desc: `${nextRetro.planet} retrógrado puede traer retrasos y revisiones. Buen momento para reflexionar, revisar y no firmar contratos importantes.`,
      emoji: nextRetro.planet === "Mercurio" ? "☿" : "♀",
      color: "#9b6dff",
    });
  }

  // Find next full moon
  const nextFull = fullMoons.find(d => d > now);
  if (nextFull) {
    const sign = signOf(moonLonOnDate(nextFull));
    const signDisp = signLabel(sign, language);
    const daysUntil = Math.ceil((nextFull - now) / (1000*60*60*24));
    events.push({
      date: nextFull,
      daysUntil,
      title: `Luna Llena en ${signDisp}`,
      desc: `La Luna Llena en ${signDisp} ilumina el área de tu carta relacionada con ${signDisp}. Momento de culminación y revelación emocional.`,
      emoji: "🌕",
      color: "#f0c040",
    });
  }

  // Venus retro
  if (venusRetro.start > now) {
    const daysUntil = Math.ceil((venusRetro.start - now) / (1000*60*60*24));
    events.push({
      date: venusRetro.start,
      daysUntil,
      title: `Venus Retrógrado en ${signLabel(venusRetro.sign, language)}`,
      desc: "Venus retrógrado invita a revisar relaciones y valores. Puede traer ex-parejas o replanteamientos del amor. Evita cirugías estéticas y compromisos nuevos.",
      emoji: "♀",
      color: "#e056a0",
    });
  }

  // Next solstice
  const nextSol = solstices.find(s => s.date > now);
  if (nextSol) {
    const daysUntil = Math.ceil((nextSol.date - now) / (1000*60*60*24));
    events.push({
      date: nextSol.date,
      daysUntil,
      title: nextSol.name,
      desc: "Punto de inflexión solar. Momento poderoso para rituales de intención y celebrar el ciclo natural.",
      emoji: nextSol.emoji,
      color: "#f0a030",
    });
  }

  return events.sort((a,b) => a.daysUntil - b.daysUntil).slice(0,4);
}

function AstroEvents() {
  const{t,language}=useLanguage();
  const events = getUpcomingEvents(language);
  return (
    <div style={{margin:"0 16px 14px"}}>
      <div style={{fontSize:11,color:"#9080b0",fontWeight:700,letterSpacing:1,marginBottom:10}}>{t("astroEventsTitle")}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {events.map((ev,i)=>(
          <div key={i} style={{background:"#1e1240",border:`1px solid ${ev.color}33`,borderRadius:14,padding:"12px 14px",display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:44,height:44,borderRadius:10,background:`${ev.color}18`,border:`1px solid ${ev.color}44`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <div style={{fontSize:18}}>{ev.emoji}</div>
              <div style={{fontSize:8,color:ev.color,fontWeight:700}}>{ev.daysUntil}d</div>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700,color:"#f8f4ff",marginBottom:3}}>{ev.title}</div>
              <div style={{fontSize:11,color:"#9080b0",lineHeight:1.5}}>{ev.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TIPS PRÁCTICOS SEGÚN LA LUNA ─────────────────────────
function getLunarTips() {
  const moon = getMoonPhase();
  const tips = {
    "Luna Nueva": [
      { icon:"💇", text:"No es el mejor momento para cortarte el cabello si quieres que crezca rápido — espera a la Luna Creciente." },
      { icon:"🌱", text:"Excelente momento para sembrar plantas o empezar hábitos nuevos." },
      { icon:"✍️", text:"Buen día para escribir metas e intenciones del mes." },
    ],
    "Creciente": [
      { icon:"💇", text:"¡Buen momento para cortarte el cabello! La energía creciente ayuda a que crezca más rápido y fuerte." },
      { icon:"💪", text:"Buen momento para empezar una rutina de ejercicio o dieta — la energía está de tu lado." },
      { icon:"📝", text:"Firma documentos o inicia proyectos — el impulso favorece los comienzos." },
    ],
    "Cuarto Creciente": [
      { icon:"💇", text:"Aún es buen momento para cortarte el cabello si buscas crecimiento." },
      { icon:"⚖️", text:"Si tienes que tomar una decisión difícil, este es el momento de hacerlo." },
      { icon:"💼", text:"Buen día para negociaciones y conversaciones importantes." },
    ],
    "Gibosa Creciente": [
      { icon:"💇", text:"Si quieres un corte de mantenimiento sin que crezca mucho, espera a la Luna Llena o Menguante." },
      { icon:"🔍", text:"Buen momento para revisar y perfeccionar proyectos antes de presentarlos." },
      { icon:"💅", text:"Buen día para tratamientos de belleza y cuidado personal." },
    ],
    "Luna Llena": [
      { icon:"💇", text:"Evita cortes drásticos hoy — las emociones intensas de la Luna Llena pueden nublar el juicio." },
      { icon:"🛁", text:"Excelente para rituales de limpieza energética y soltar lo que no sirve." },
      { icon:"💎", text:"Buen momento para cerrar negocios o recibir resultados que esperabas." },
    ],
    "Gibosa Menguante": [
      { icon:"💇", text:"Buen momento para cortarte las puntas si buscas fortalecer el cabello sin que crezca mucho." },
      { icon:"🙏", text:"Día ideal para agradecer y reconocer lo que has logrado." },
      { icon:"📦", text:"Buen momento para donar u organizar — soltar lo que ya no usas." },
    ],
    "Cuarto Menguante": [
      { icon:"💇", text:"Si quieres frenar el crecimiento del cabello (ej: para mantener un corte), este es buen momento." },
      { icon:"🧘", text:"Evita decisiones importantes hoy — mejor reflexiona y descansa." },
      { icon:"🗑️", text:"Buen día para deshacerte de cosas, relaciones o hábitos que ya no te sirven." },
    ],
    "Menguante": [
      { icon:"💇", text:"Buen momento para cortes que buscan frenar el crecimiento o eliminar puntas dañadas." },
      { icon:"😴", text:"Prioriza el descanso — tu energía está naturalmente baja, no te exijas de más." },
      { icon:"📓", text:"Buen día para llevar un diario y procesar lo vivido este mes." },
    ],
  };
  return tips[moon.name] || tips["Creciente"];
}

function LunarTips() {
  const{t,language}=useLanguage();
  const tips = getLunarTips();
  const moon = getMoonPhase();
  return (
    <div style={{margin:"0 16px 14px"}}>
      <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:10}}>{t("lunarTipsTitle",{moon:moonPhaseLabel(moon.name,language).toUpperCase()})}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {tips.map((tip,i)=>(
          <div key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:20,flexShrink:0}}>{tip.icon}</span>
            <p style={{fontSize:12,color:C.white,lineHeight:1.6,margin:0}}>{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LUNA VISUAL DEL MES ──────────────────────────────────
function MoonCalendar() {
  const{t,language}=useLanguage();
  const phases = getMonthMoonPhases();
  const moon = getMoonPhase();
  return (
    <div style={{margin:"0 16px 14px",background:"#1e1240",border:"1px solid #2e1f5e",borderRadius:16,padding:16}}>
      <div style={{textAlign:"center",marginBottom:14}}>
        <div style={{fontSize:48,lineHeight:1,marginBottom:6}}>{moon.emoji}</div>
        <div style={{fontSize:14,fontWeight:700,color:"#f0c040"}}>{moonPhaseLabel(moon.name,language)}</div>
        <div style={{fontSize:11,color:"#9080b0",marginTop:2}}>en {signLabel(signOf(moonLonOnDate(new Date())),language)}</div>
        <div style={{fontSize:11,color:"#9080b0",marginTop:2}}>{moonEnergyLabel(moon.energy,language)}</div>
      </div>
      {phases.length > 0 && (
        <>
          <div style={{fontSize:10,color:"#9080b0",fontWeight:700,letterSpacing:1,marginBottom:10}}>{t("moonPhasesTitle")}</div>
          <div style={{display:"flex",gap:6,justifyContent:"space-around"}}>
            {phases.map((p,i)=>(
              <div key={i} style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:24,marginBottom:4}}>{p.emoji}</div>
                <div style={{fontSize:9,color:"#f8f4ff",fontWeight:600,lineHeight:1.3}}>{moonPhaseLabel(p.name,language)}</div>
                <div style={{fontSize:9,color:"#4a3870",marginTop:2}}>{p.date}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── SINASTRÍA INTER-CARTA MEJORADA ───────────────────────
const INTERASPECT_MEANINGS = {
  "Sol-Sol":        { conj:"Dos personalidades muy similares. Pueden entenderse bien o competir.", trig:"Fluyen bien juntos. Valores y dirección de vida compatibles.", sext:"Buena conexión. Se estimulan mutuamente de forma natural.", cua:"Diferencias de ego y estilo que requieren trabajo.", op:"Se atraen pero también chocan. La tensión puede ser estimulante o agotadora." },
  "Sol-Luna":       { conj:"Conexión profunda entre personalidad e instintos. Muy complementarios.", trig:"Armonía natural entre mente y corazón. Se sienten en casa juntos.", sext:"Buena comunicación emocional. Se apoyan bien.", cua:"El uno puede sentirse no visto por el otro. Requiere paciencia.", op:"Tensión clásica. Se necesitan pero también se frustran." },
  "Venus-Marte":    { conj:"Atracción física y química inmediata. Uno de los aspectos más potentes.", trig:"Atracción fluida y natural. El romance llega fácil.", sext:"Buena energía romántica y sexual entre los dos.", cua:"Atracción intensa mezclada con frustración. Química pero también conflicto.", op:"Magnetismo muy fuerte. Pueden ser opuestos que se atraen irresistiblemente." },
  "Venus-Venus":    { conj:"Gustos similares, valores afines. Se entienden en el amor.", trig:"Harmonizan muy bien en el amor y los placeres compartidos.", sext:"Conexión afectiva suave y agradable.", cua:"Visiones distintas del amor. Puede generar incomprensión.", op:"Enfoques opuestos del amor que pueden complementarse o chocar." },
  "Luna-Luna":      { conj:"Resonancia emocional profunda. Se sienten comprendidos.", trig:"Sintonía emocional fluida. Se nutren mutuamente.", sext:"Buena compatibilidad emocional.", cua:"Necesidades emocionales diferentes. Requiere comunicación.", op:"Necesidades emocionales opuestas. Pueden complementarse o frustrarse." },
  "Sol-Venus":      { conj:"Admiración mutua. Uno adora la personalidad del otro.", trig:"Afecto y apreciación natural. Disfrutan estar juntos.", sext:"Conexión afectuosa y armoniosa.", cua:"Pueden no valorar lo que el otro ofrece.", op:"Se atraen pero sus formas de amar son muy diferentes." },
  "Luna-Venus":     { conj:"Ternura y cuidado emocional profundo.", trig:"Harmonizan muy bien emocionalmente. Mucho cuidado mutuo.", sext:"Conexión cálida y nutritiva.", cua:"Pueden tener necesidades afectivas distintas.", op:"Una necesita seguridad, la otra libertad en el amor." },
  "Marte-Marte":    { conj:"Energía y pasión compartida. Puede ser mucho o muy intenso.", trig:"Buena energía compartida. Se motivan mutuamente.", sext:"Trabajan bien juntos energéticamente.", cua:"Pueden competir o irritarse mutuamente.", op:"Conflicto de voluntades. Intensa atracción o fricción." },
};

function getInterAspectMeaning(p1, p2, aspName) {
  const key1 = `${p1}-${p2}`, key2 = `${p2}-${p1}`;
  const meanings = INTERASPECT_MEANINGS[key1] || INTERASPECT_MEANINGS[key2];
  if (!meanings) return null;
  const map = { "Conjunción":"conj","Trígono":"trig","Sextil":"sext","Cuadratura":"cua","Oposición":"op" };
  return meanings[map[aspName]] || null;
}

function SinastriaDetalle({ interAspects, s1, s2, theirName, myProfile }) {
  const{t}=useLanguage();
  const [open, setOpen] = useState(null);
  const meaningful = interAspects.filter(a => getInterAspectMeaning(a.pA, a.pB, a.name));
  const typeColor = { major: C.gold, harmonious: C.teal, tension: C.danger };

  return (
    <div style={{marginTop:12}}>
      <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:10}}>
        {t("interAspectsTitle",{count:interAspects.length})}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {interAspects.slice(0,8).map((a,i)=>{
          const meaning = getInterAspectMeaning(a.pA, a.pB, a.name);
          const isOpen = open === i;
          return (
            <div key={i} onClick={()=>setOpen(isOpen?null:i)}
              style={{background:C.bgCard,border:`1px solid ${isOpen?(typeColor[a.type]||C.gold)+"66":C.border}`,borderRadius:12,padding:"10px 12px",cursor:meaning?"pointer":"default"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:28,height:28,borderRadius:8,background:`${typeColor[a.type]||C.gold}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:typeColor[a.type]||C.gold,flexShrink:0}}>{a.symbol}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.white}}>
                    {a.pA} <span style={{color:C.muted,fontSize:10}}>de {myProfile?.name?.split(" ")[0]||"ti"}</span> {a.symbol} {a.pB} <span style={{color:C.muted,fontSize:10}}>de {theirName?.split(" ")[0]||"él/ella"}</span>
                  </div>
                  <div style={{fontSize:10,color:C.muted}}>{a.name} · orbe {a.exact}° {parseFloat(a.exact)<1?"(exacto)":""}</div>
                </div>
                {meaning && <div style={{fontSize:12,color:C.muted}}>▾</div>}
              </div>
              {isOpen && meaning && (
                <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                  <p style={{fontSize:12,color:C.white,lineHeight:1.65,margin:0}}>{meaning}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OracleCard({oracle,profile,chart,transits,setTab}){
  const{t,language}=useLanguage();
  const[openSec,setOpenSec]=useState(null);
  if(!oracle)return null;
  const ACC=[{key:"energia",label:t("oracleSectionEnergia"),icon:"⚡",color:C.gold},{key:"amor",label:t("oracleSectionAmor"),icon:"💕",color:C.pink},{key:"trabajo",label:t("oracleSectionTrabajo"),icon:"💼",color:C.teal}];
  return <div>
    {/* Saludo humano */}
    {profile&&<div style={{textAlign:"center",padding:"20px 16px 8px"}}>
      <div style={{
        width:88,height:88,borderRadius:"50%",margin:"0 auto 10px",
        background:`linear-gradient(135deg, ${C.violet}33, ${C.pink}22)`,
        border:`2px solid ${C.gold}55`,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:52,boxShadow:`0 4px 20px ${C.violet}33`,
      }}>
        {profile.avatar || "✨"}
      </div>
      <div style={{fontSize:18,fontWeight:800,color:C.white}}>{t("oracleGreeting",{name:profile.name.split(" ")[0]})}</div>
    </div>}
    <div style={{textAlign:"center",padding:"10px 16px 10px"}}>
      <div style={{fontSize:10,color:C.muted,fontWeight:700,letterSpacing:1.5,marginBottom:6}}>{new Date().toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"}).toUpperCase()}</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        <span style={{fontSize:22}}>{oracle.moon.emoji}</span>
        <div><span style={{fontSize:13,color:C.gold,fontWeight:700}}>{moonPhaseLabel(oracle.moon.name,language)}</span><span style={{fontSize:11,color:C.muted,marginLeft:8}}>{moonEnergyLabel(oracle.moon.energy,language)}</span></div>
      </div>
      {profile&&chart&&<div style={{display:"flex",justifyContent:"center",gap:6,marginTop:10,flexWrap:"wrap"}}><Pill color={C.gold}>☀️ {signLabel(chart.planets.Sol.sign,language)}</Pill><Pill color={C.cyan}>🌙 {signLabel(chart.planets.Luna.sign,language)}</Pill><Pill color={C.violet}>↑ {signLabel(chart.ascSign,language)}</Pill></div>}
    </div>
    <div style={{margin:"0 16px 12px"}}>
      <div style={{background:`linear-gradient(135deg, ${C.violet}22, ${C.pink}18)`,border:`1px solid ${C.violet}55`,borderRadius:18,padding:"18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:32,height:32,borderRadius:"50%",background:`${C.violet}30`,border:`1px solid ${C.violet}66`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🌟</div><div style={{fontSize:11,color:C.violet,fontWeight:800,letterSpacing:1,textTransform:"uppercase"}}>{t("oracleAdvice")}</div></div>
        <p style={{fontSize:14,color:C.white,lineHeight:1.75,margin:0,fontStyle:"italic"}}>"{oracle.consejo}"</p>
      </div>
    </div>
    <div style={{padding:"0 16px"}}>
      {ACC.map(sec=>{const content=oracle[sec.key];if(!content)return null;const isOpen=openSec===sec.key;const preview=content.split(/[.!?]/)[0].trim();
        return <div key={sec.key} onClick={()=>setOpenSec(isOpen?null:sec.key)} style={{background:C.bgCard,border:`1px solid ${isOpen?sec.color+"55":C.border}`,borderRadius:14,padding:14,marginBottom:8,cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:"50%",flexShrink:0,background:`${sec.color}18`,border:`1px solid ${sec.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{sec.icon}</div>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:11,color:sec.color,fontWeight:700,marginBottom:2}}>{sec.label}</div>{!isOpen&&<div style={{fontSize:12,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{preview}…</div>}</div>
            <div style={{fontSize:14,color:C.muted,flexShrink:0,transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</div>
          </div>
          {isOpen&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}><p style={{fontSize:13,color:C.white,lineHeight:1.7,margin:0}}>{content}</p></div>}
        </div>;
      })}
    </div>
  </div>;
}

// ── CARTA NATAL ──────────────────────────────────────────
// Qué representa cada planeta, en lenguaje simple
const PLANET_MEANING = {
  Sol: "tu esencia y quién eres en el fondo",
  Luna: "tus emociones y lo que necesitas para sentirte seguro/a",
  Mercurio: "cómo piensas y te comunicas",
  Venus: "cómo amas y qué te atrae",
  Marte: "tu energía, deseo y cómo actúas",
  Júpiter: "dónde encuentras suerte y crecimiento",
  Saturno: "tus responsabilidades y dónde maduras con esfuerzo",
  Urano: "dónde rompes reglas y buscas libertad",
  Neptuno: "tus sueños, intuición y espiritualidad",
  Plutón: "dónde vives transformaciones profundas",
};

const PLANET_MEANING_EN = {
  Sol: "your essence and who you are at your core",
  Luna: "your emotions and what you need to feel safe",
  Mercurio: "how you think and communicate",
  Venus: "how you love and what attracts you",
  Marte: "your energy, desire, and how you take action",
  Júpiter: "where you find luck and growth",
  Saturno: "your responsibilities and where you mature through effort",
  Urano: "where you break rules and seek freedom",
  Neptuno: "your dreams, intuition, and spirituality",
  Plutón: "where you live out deep transformations",
};

// Explicación corta de cada casa, en lenguaje simple
const HOUSE_SIMPLE = [
  "tu personalidad y cómo te presentas al mundo",
  "tu dinero, tus valores y lo que consideras importante",
  "cómo te comunicas y tu entorno cercano (hermanos, vecinos)",
  "tu hogar, tu familia y tus raíces",
  "el romance, la creatividad y los hijos",
  "tu trabajo diario, rutinas y salud",
  "tus relaciones de pareja y sociedades",
  "la intimidad profunda, lo compartido y las transformaciones",
  "los viajes, estudios superiores y tu filosofía de vida",
  "tu carrera, tu reputación pública",
  "tus amistades y grupos a los que perteneces",
  "tu mundo espiritual e interior, lo que procesas en soledad",
];

const HOUSE_SIMPLE_EN = [
  "your personality and how you present yourself to the world",
  "your money, your values, and what you consider important",
  "how you communicate and your close circle (siblings, neighbors)",
  "your home, your family, and your roots",
  "romance, creativity, and children",
  "your daily work, routines, and health",
  "your romantic relationships and partnerships",
  "deep intimacy, what's shared, and transformation",
  "travel, higher education, and your philosophy of life",
  "your career and public reputation",
  "your friendships and the groups you belong to",
  "your spiritual and inner world, what you process in solitude",
];

// Significado simple de cada tipo de aspecto
const ASPECT_SIMPLE = {
  "Conjunción": "estos dos planetas trabajan juntos como uno solo — fusionan su energía",
  "Trígono": "fluyen con facilidad entre sí — es un talento natural",
  "Sextil": "se ayudan mutuamente cuando los activas conscientemente",
  "Cuadratura": "generan tensión y fricción — un reto que te hace crecer",
  "Oposición": "tiran en direcciones opuestas — buscan equilibrio entre dos extremos",
};

const ASPECT_SIMPLE_EN = {
  "Conjunción": "these two planets work together as one — they fuse their energy",
  "Trígono": "they flow easily together — it's a natural talent",
  "Sextil": "they support each other once you consciously activate them",
  "Cuadratura": "they create tension and friction — a challenge that helps you grow",
  "Oposición": "they pull in opposite directions — seeking balance between two extremes",
};

function CartaNatal({chart,transits,transitAspects}){
  const{t,language}=useLanguage();
  const isEn = language === "en";
  const PMEAN = isEn ? PLANET_MEANING_EN : PLANET_MEANING;
  const HSIMP = isEn ? HOUSE_SIMPLE_EN : HOUSE_SIMPLE;
  const ASIMP = isEn ? ASPECT_SIMPLE_EN : ASPECT_SIMPLE;
  const[sec,setSec]=useState("planetas");
  const PC={Sol:C.gold,Luna:C.cyan,Mercurio:C.warn,Venus:C.pink,Marte:C.danger,Júpiter:C.violet,Saturno:C.teal,Urano:C.teal,Neptuno:C.violet,Plutón:C.muted};
  const HM=["Personalidad, apariencia","Dinero, valores","Comunicación, mente","Hogar, familia","Creatividad, romance","Salud, trabajo","Relaciones, matrimonio","Transformación, intimidad","Filosofía, viajes","Carrera, reputación","Amigos, grupos","Espiritualidad, karma"];
  const[expandedPlanet,setExpandedPlanet]=useState(null);
  const[expandedAspect,setExpandedAspect]=useState(null);

  const SEC_INTRO = isEn ? {
    planetas: "Planets represent different parts of you — they're not people, they're energies. The Sun, for example, is your essence and the Moon is your emotions. The sign says HOW that energy expresses itself, and the House says in WHAT AREA of your life.",
    casas: "Your chart is divided into 12 \"houses,\" like the rooms of your life: one is money, another is love, another is work, and so on. The sign in each house shows the style you bring to that area.",
    aspectos: "An aspect is the angle two planets form with each other in your chart. Depending on that angle, the planets help each other, clash, or merge — like two characters of your personality interacting.",
    transitos: "Planets keep moving across the sky every day (that's what \"transits\" are). When today's planet forms an angle with a planet in your natal chart, it activates that energy in your current life.",
  } : {
    planetas: "Los planetas muestran distintas partes de ti — no son personas, son energías. Por ejemplo el Sol es tu esencia y la Luna tus emociones. El signo dice CÓMO se expresa esa energía, y la Casa dice EN QUÉ ÁREA de tu vida.",
    casas: "Tu carta se divide en 12 \"casas\", como las habitaciones de tu vida: una es el dinero, otra el amor, otra el trabajo, etc. El signo en cada casa muestra el estilo con el que vives esa área.",
    aspectos: "Un aspecto es el ángulo que forman dos planetas entre sí en tu carta. Según ese ángulo, los planetas se ayudan, chocan o se fusionan — como dos personajes de tu personalidad interactuando.",
    transitos: "Los planetas se siguen moviendo cada día en el cielo (eso son los \"tránsitos\"). Cuando un planeta de hoy forma un ángulo con un planeta de tu carta natal, activa esa energía en tu vida actual.",
  };

  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:8,marginBottom:14}}>
      {[{label:t("cartaAscendant"),value:`${signLabel(chart.ascSign,language)} ${chart.ascDeg}°`,glyph:"↑",color:C.gold,sub:t("cartaAscSub")},{label:t("cartaMidheaven"),value:`${signLabel(chart.mcSign,language)} ${chart.mcDeg}°`,glyph:"MC",color:C.violet,sub:t("cartaMcSub")},{label:t("cartaNorthNode"),value:signLabel(chart.nnSign,language),glyph:"☊",color:C.teal,sub:t("cartaNnSub")}].map(item=>(
        <Card key={item.label} style={{textAlign:"center",padding:12}}>
          <div style={{fontSize:16,color:item.color,fontWeight:700,marginBottom:2}}>{item.glyph}</div>
          <div style={{fontSize:12,fontWeight:700,color:item.color}}>{item.value}</div>
          <div style={{fontSize:9,color:C.muted,marginTop:2}}>{item.label}</div>
          <div style={{fontSize:8,color:C.mutedDark,marginTop:1,fontStyle:"italic"}}>{item.sub}</div>
        </Card>
      ))}
    </div>

    <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
      {[["planetas",t("cartaTabPlanetas")],["casas",t("cartaTabCasas")],["aspectos",t("cartaTabAspectos")],["transitos",t("cartaTabTransitos")]].map(([id,label])=><GhostBtn key={id} active={sec===id} onClick={()=>{setSec(id);setExpandedPlanet(null);setExpandedAspect(null);}}>{label}</GhostBtn>)}
    </div>

    {/* Explicación de la sección actual — siempre visible */}
    <div style={{background:`${C.violet}10`,border:`1px solid ${C.violetDim}33`,borderRadius:12,padding:"10px 12px",marginBottom:14}}>
      <p style={{fontSize:11,color:C.muted,lineHeight:1.6,margin:0}}>💡 {SEC_INTRO[sec]}</p>
    </div>

    {sec==="planetas"&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
      {Object.entries(chart.planets).map(([name,data])=>{
        const isOpen = expandedPlanet === name;
        return <div key={name} onClick={()=>setExpandedPlanet(isOpen?null:name)}
          style={{background:C.bgCard,border:`1px solid ${isOpen?(PC[name]||C.border)+"66":C.border}`,borderRadius:12,padding:"10px 14px",cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:20,width:28,textAlign:"center"}}>{PLANET_SYMBOLS[name]}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:PC[name]||C.white}}>{name}</div>
              <div style={{fontSize:11,color:C.muted}}>{signLabel(data.sign,language)} {data.deg}° · Casa {data.house}</div>
            </div>
            <div style={{fontSize:18}}>{SIGN_GLYPHS[data.signIdx]}</div>
            <div style={{fontSize:12,color:C.muted,marginLeft:4}}>{isOpen?"▾":"▸"}</div>
          </div>
          {isOpen&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
            <p style={{fontSize:12,color:C.white,lineHeight:1.65,margin:0}}>
              {isEn
                ? <>
                    <strong style={{color:PC[name]}}>{name}</strong> represents {PMEAN[name]}. In your chart it's in <strong style={{color:C.white}}>{signLabel(data.sign,language)}</strong>, so that energy expresses itself in the style of {signLabel(data.sign,language)}. And it falls in your <strong style={{color:C.white}}>House {data.house}</strong>, the area of {HSIMP[data.house-1]}.
                  </>
                : <>
                    <strong style={{color:PC[name]}}>{name}</strong> representa {PMEAN[name]}. En tu carta está en <strong style={{color:C.white}}>{data.sign}</strong>, así que esa energía se expresa con el estilo de {data.sign}. Y cae en tu <strong style={{color:C.white}}>Casa {data.house}</strong>, el área de {HSIMP[data.house-1]}.
                  </>}
            </p>
          </div>}
        </div>;
      })}
      <div onClick={()=>setExpandedPlanet(expandedPlanet==="Lilith"?null:"Lilith")} style={{background:C.bgCard,border:`1px solid ${expandedPlanet==="Lilith"?C.violet+"66":C.border}`,borderRadius:12,padding:"10px 14px",cursor:"pointer"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:20,width:28,textAlign:"center"}}>🌑</div>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.violet}}>{t("cartaLilithTitle")}</div><div style={{fontSize:11,color:C.muted}}>{signLabel(chart.lilithSign,language)} {chart.lilithDeg}° · Casa {chart.lilithHouse}</div></div>
          <div style={{fontSize:12,color:C.muted}}>{expandedPlanet==="Lilith"?"▾":"▸"}</div>
        </div>
        {expandedPlanet==="Lilith"&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
          <p style={{fontSize:12,color:C.white,lineHeight:1.65,margin:0}}>{isEn
            ? <>Lilith isn't a real planet but a mathematical point: it represents your most instinctive, wild, and sometimes taboo side — what society asked you to repress. In <strong style={{color:C.white}}>{signLabel(chart.lilithSign,language)}</strong> (House {chart.lilithHouse}), that repressed energy seeks to express itself in the area of {HSIMP[chart.lilithHouse-1]}.</>
            : <>Lilith no es un planeta real sino un punto matemático: representa tu lado más instintivo, salvaje y a veces tabú — lo que la sociedad te pidió reprimir. En <strong style={{color:C.white}}>{chart.lilithSign}</strong> (Casa {chart.lilithHouse}), esa energía reprimida busca expresarse en el área de {HSIMP[chart.lilithHouse-1]}.</>}</p>
        </div>}
      </div>
    </div>}

    {sec==="casas"&&<div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:8}}>
      {chart.cusps.map((cusp,i)=>{const planetsHere=Object.entries(chart.planets).filter(([,d])=>d.house===i+1).map(([n])=>n);
        return <Card key={i} style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}><div style={{fontSize:10,color:C.gold,fontWeight:700}}>{t("cartaHouse",{n:i+1}).toUpperCase()}</div><div style={{fontSize:13,color:C.white,fontWeight:700}}>{signLabel(signOf(cusp),language)}</div></div>
          <div style={{fontSize:10,color:C.muted,lineHeight:1.4,marginBottom:planetsHere.length?6:0}}>{HSIMP[i]}</div>
          {planetsHere.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{planetsHere.map(p=><Pill key={p} color={PC[p]||C.muted} style={{fontSize:9,padding:"1px 6px"}}>{p}</Pill>)}</div>}
        </Card>;
      })}
    </div>}

    {sec==="aspectos"&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
      {chart.aspects.length===0?<p style={{color:C.muted,textAlign:"center",padding:24}}>{t("cartaNoAspects")}</p>
        :chart.aspects.slice(0,14).map((asp,i)=>{
          const isOpen = expandedAspect === i;
          return <div key={i} onClick={()=>setExpandedAspect(isOpen?null:i)}
            style={{background:C.bgCard,border:`1px solid ${isOpen?(asp.type==="harmonious"?C.teal:asp.type==="tension"?C.danger:C.gold)+"66":C.border}`,borderRadius:12,padding:"10px 14px",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:18,color:asp.type==="harmonious"?C.teal:asp.type==="tension"?C.danger:C.gold,width:28,textAlign:"center"}}>{asp.symbol}</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.white}}>{asp.p1} {asp.symbol} {asp.p2}</div><div style={{fontSize:11,color:C.muted}}>{asp.name} · orbe {asp.exact}°</div></div>
              <Pill color={asp.type==="harmonious"?C.teal:asp.type==="tension"?C.danger:C.gold} style={{fontSize:9}}>{asp.type==="harmonious"?t("cartaHarmonious"):asp.type==="tension"?t("cartaTension"):t("cartaMajor")}</Pill>
            </div>
            {isOpen&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
              <p style={{fontSize:12,color:C.white,lineHeight:1.65,margin:0}}>
                {isEn
                  ? <>This is a <strong style={{color:C.white}}>{asp.name}</strong>: {ASIMP[asp.name]}. In this case it's between <strong style={{color:PC[asp.p1]}}>{asp.p1}</strong> ({PMEAN[asp.p1]}) and <strong style={{color:PC[asp.p2]}}>{asp.p2}</strong> ({PMEAN[asp.p2]}).</>
                  : <>Esta es una <strong style={{color:C.white}}>{asp.name}</strong>: {ASIMP[asp.name]}. En este caso es entre <strong style={{color:PC[asp.p1]}}>{asp.p1}</strong> ({PMEAN[asp.p1]}) y <strong style={{color:PC[asp.p2]}}>{asp.p2}</strong> ({PMEAN[asp.p2]}).</>}
              </p>
            </div>}
          </div>;
        })}
    </div>}

    {sec==="transitos"&&<div>
      {transitAspects.length===0?<p style={{color:C.muted,textAlign:"center",padding:24}}>{t("cartaNoTransits")}</p>
        :<div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>{transitAspects.slice(0,8).map((asp,i)=>{
          const isOpen = expandedAspect === `t${i}`;
          return <div key={i} onClick={()=>setExpandedAspect(isOpen?null:`t${i}`)}
            style={{background:C.bgCard,border:`1px solid ${isOpen?C.gold+"66":C.border}`,borderRadius:12,padding:"10px 14px",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}><div style={{fontSize:12,fontWeight:700,color:C.white}}>{asp.transit} {asp.symbol} {asp.natal} natal</div><Pill color={parseFloat(asp.exact)<2?C.gold:C.violet} style={{fontSize:9}}>{parseFloat(asp.exact)<2?t("cartaExact"):`${asp.exact}°`}</Pill></div>
            <div style={{fontSize:11,color:C.muted}}>{asp.name} · {asp.transit} en {signLabel(asp.transitSign,language)} {asp.transitDeg}°</div>
            {isOpen&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
              <p style={{fontSize:12,color:C.white,lineHeight:1.65,margin:0}}>
                {isEn
                  ? <>Today, the <strong style={{color:C.white}}>{asp.transit}</strong> currently in the sky forms a <strong style={{color:C.white}}>{asp.name}</strong> with your natal <strong style={{color:C.white}}>{asp.natal}</strong> ({PMEAN[asp.natal]}). {ASIMP[asp.name]}. This is activating that part of your chart right now in your life.</>
                  : <>Hoy, el <strong style={{color:C.white}}>{asp.transit}</strong> que está en el cielo ahora mismo forma una <strong style={{color:C.white}}>{asp.name}</strong> con tu <strong style={{color:C.white}}>{asp.natal} natal</strong> ({PMEAN[asp.natal]}). {ASIMP[asp.name]}. Esto está activando esa parte de tu carta en este momento de tu vida.</>}
              </p>
            </div>}
          </div>;
        })}</div>}
      <div><div style={{fontSize:11,color:C.muted,fontWeight:700,marginBottom:8}}>{t("cartaTodaySkyPositions")}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:6}}>{Object.entries(transits).map(([name,lon])=>(
          <div key={name} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 12px",display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:14}}>{PLANET_SYMBOLS[name]}</span><div><div style={{fontSize:11,fontWeight:700,color:C.white}}>{name}</div><div style={{fontSize:10,color:C.muted}}>{signLabel(signOf(lon),language)} {degInSign(lon)}°</div></div></div>
        ))}</div>
      </div>
    </div>}
  </div>;
}

// ── TAROT VIEW ───────────────────────────────────────────
function TarotView(){
  const{t:tr,language}=useLanguage();
  const[cards,setCards]=useState(null);
  const[intent,setIntent]=useState("");
  const[revealed,setRevealed]=useState([false,false,false]);
  function draw(){setCards(drawTarot(language));setRevealed([false,false,false]);}
  function reveal(i){setRevealed(r=>{const n=[...r];n[i]=true;return n;});}
  const POSKEYS=["tarotPast","tarotPresent","tarotFuture"];
  const POS=POSKEYS.map(k=>tr(k));
  const PREGKEYS={PASADO:"tarotQPast",PRESENTE:"tarotQPresent",FUTURO:"tarotQFuture"};
  const POS_RAW=["PASADO","PRESENTE","FUTURO"];
  const CARD_TEXT={PASADO:"past",PRESENTE:"present",FUTURO:"future"};
  const FILTERS=[{key:"tarotFilterAmor"},{key:"tarotFilterTrabajo"},{key:"tarotFilterDinero"},{key:"tarotFilterDecision"},{key:"tarotFilterMiCamino"}];
  return <div style={{padding:16}}>
    <h2 style={{color:C.gold,fontSize:15,fontWeight:700,margin:"0 0 14px"}}>{tr("tarotTitle")}</h2>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>{FILTERS.map(f=>{const label=tr(f.key);return <GhostBtn key={f.key} active={intent===label} onClick={()=>setIntent(intent===label?"":label)}>{label}</GhostBtn>;})}</div>
    {!cards?<Card style={{textAlign:"center",padding:32}}>
      <div style={{fontSize:48,marginBottom:12}}>🃏</div>
      <p style={{color:C.muted,fontSize:14,marginBottom:20,lineHeight:1.6}}>{tr("tarotCenterMind",{intentSuffix:intent?tr("tarotIntentSuffix",{intent:intent.toLowerCase()}):""})}</p>
      <GoldBtn onClick={draw}>{tr("tarotReveal3")}</GoldBtn>
    </Card>:<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:8,marginBottom:14}}>
        {cards.map((card,i)=><div key={i} style={{background:C.bgCard,border:`1px solid ${revealed[i]?C.gold:C.border}`,borderRadius:14,padding:12,textAlign:"center",cursor:revealed[i]?"default":"pointer",transition:"border-color 0.3s"}} onClick={()=>!revealed[i]&&reveal(i)}>
          <div style={{fontSize:10,color:C.gold,fontWeight:700,marginBottom:8}}>{POS[i]}</div>
          {!revealed[i]?<div style={{background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:8,padding:"24px 8px",marginBottom:8}}>
            <div style={{fontSize:24}}>🃏</div>
            <div style={{fontSize:10,color:C.muted,marginTop:6}}>{tr("tarotTapToReveal")}</div>
          </div>:<>
            <div style={{background:C.bgMid,border:`1px solid ${C.goldDim}44`,borderRadius:8,padding:"16px 8px",marginBottom:8}}><div style={{fontSize:20,color:C.gold}}>{card.s}</div></div>
            <div style={{fontSize:10,fontWeight:700,color:C.white,lineHeight:1.3,marginBottom:4}}>{card.n}</div>
          </>}
        </div>)}
      </div>
      {revealed.some(r=>r)&&<div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
        {cards.map((card,i)=>revealed[i]&&<Card key={i} style={{padding:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:`${C.gold}20`,border:`1px solid ${C.goldDim}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:C.gold,flexShrink:0}}>{card.s}</div>
            <div><div style={{fontSize:10,color:C.muted,fontWeight:700}}>{POS[i]} — {tr(PREGKEYS[POS_RAW[i]])}</div><div style={{fontSize:13,fontWeight:700,color:C.gold}}>{card.n}</div></div>
          </div>
          <p style={{fontSize:13,color:C.white,lineHeight:1.7,margin:0}}>{card[CARD_TEXT[POS_RAW[i]]]}</p>
        </Card>)}
      </div>}
      <GoldBtn onClick={()=>{setCards(null);setIntent("");}} style={{width:"100%"}}>{tr("tarotNewDraw")}</GoldBtn>
    </div>}
  </div>;
}

// ── TOP MATCHES VIEW ─────────────────────────────────────
function TopMatchesView({mySign,onBack}){
  const{t,language}=useLanguage();
  const ranked=SIGNS_LIST.filter(s=>s.name!==mySign).map(s=>({...s,score:Math.min(97,Math.max(32,COMPAT_MATRIX[ELEM[mySign]]?.[ELEM[s.name]]||60))})).sort((a,b)=>b.score-a.score);
  const mine=SIGNS_LIST.find(s=>s.name===mySign);
  return <div style={{padding:16}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><button onClick={onBack} style={{background:"none",border:"none",color:C.violet,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{t("amorBack")}</button><h2 style={{color:C.gold,fontSize:14,fontWeight:700,margin:0}}>{t("topMatchesTitle")}</h2></div>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,justifyContent:"center"}}>
      <span style={{fontSize:24}}>{mine?.glyph}</span><span style={{color:mine?.color,fontWeight:700,fontSize:14}}>{signLabel(mySign,language)}</span>
    </div>
    <p style={{color:C.muted,fontSize:12,marginBottom:14,textAlign:"center"}}>{t("topMatchesSubtitle")}</p>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {ranked.map((s,i)=>{
        const sc=s.score>=75?C.success:s.score>=55?C.gold:C.danger;
        return <div key={s.name} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:11,color:C.mutedDark,fontWeight:700,width:18,flexShrink:0}}>{i+1}</div>
          <div style={{fontSize:20,flexShrink:0}}>{s.glyph}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:700,color:s.color}}>{signLabel(s.name,language)}</div>
            <div style={{background:C.bgMid,borderRadius:6,height:5,marginTop:4,overflow:"hidden"}}><div style={{width:`${s.score}%`,height:"100%",background:sc,borderRadius:6}} /></div>
          </div>
          <div style={{fontSize:14,fontWeight:800,color:sc,flexShrink:0}}>{s.score}%</div>
        </div>;
      })}
    </div>
  </div>;
}

// ── COMPATIBLE SIGNS VIEW ────────────────────────────────
function CompatibleSignsView({chart,profile,onBack}){
  const{t,language}=useLanguage();
  const[sel,setSel]=useState(null);
  const findings=buildCompatibleSignsData(chart);
  if(sel)return <div style={{padding:16}}>
    <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:C.violet,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit",marginBottom:14}}>{t("amorBack")}</button>
    <div style={{background:C.bgCard,border:`1px solid ${sel.color}44`,borderRadius:16,padding:16,marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:42,height:42,borderRadius:12,background:`${sel.color}20`,border:`1px solid ${sel.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{sel.icon}</div>
        <div><div style={{fontSize:11,color:sel.color,fontWeight:700}}>{sel.theme.toUpperCase()}{sel.houseNum?` · CASA ${sel.houseNum}`:""}</div><div style={{fontSize:18,fontWeight:800,color:C.white}}>{SIGNS_LIST.find(s=>s.name===sel.sign)?.glyph||"✨"} {signLabel(sel.sign,language)}</div></div>
        <span style={{marginLeft:"auto",fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:10,background:`${INTENSITY_LABELS[sel.intensity].color}22`,color:INTENSITY_LABELS[sel.intensity].color,border:`1px solid ${INTENSITY_LABELS[sel.intensity].color}44`}}>{INTENSITY_LABELS[sel.intensity].label}</span>
      </div>
      <p style={{fontSize:13,color:C.white,lineHeight:1.7,margin:0}}>{sel.desc}</p>
    </div>
  </div>;
  return <div style={{padding:16}}>
    <button onClick={onBack} style={{background:"none",border:"none",color:C.violet,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit",marginBottom:14}}>{t("amorBack")}</button>
    <div style={{marginBottom:16}}><h2 style={{color:C.gold,fontSize:16,fontWeight:800,margin:"0 0 6px"}}>{t("compatibleSignsTitle")}</h2><p style={{color:C.muted,fontSize:12,lineHeight:1.5}}>{t("compatibleSignsSubtitle")}</p>
      <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}><Pill color={C.gold}>☀️ {signLabel(chart.planets.Sol.sign,language)}</Pill><Pill color={C.pink}>♀ Venus {signLabel(chart.planets.Venus.sign,language)}</Pill><Pill color={C.warn}>♂ Marte {signLabel(chart.planets.Marte.sign,language)}</Pill></div>
    </div>
    <div style={{background:`${C.gold}10`,border:`1px solid ${C.goldDim}44`,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
      <p style={{fontSize:11,color:C.gold,fontWeight:700,margin:"0 0 4px"}}>{t("compatibleSignsHintTitle")}</p>
      <p style={{fontSize:11,color:C.muted,lineHeight:1.6,margin:0}}>{t("compatibleSignsHintBody")}</p>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {findings.map((f,i)=>{const il=INTENSITY_LABELS[f.intensity],si=SIGNS_LIST.find(s=>s.name===f.sign);
        return <div key={i} onClick={()=>setSel(f)} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}} onMouseEnter={e=>e.currentTarget.style.borderColor=f.color} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
          <div style={{width:38,height:38,borderRadius:10,background:`${f.color}18`,border:`1px solid ${f.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{f.icon}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:f.color,fontWeight:700,marginBottom:2}}>{f.theme}{f.houseNum?` · Casa ${f.houseNum}`:""}</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:18}}>{si?.glyph||"✨"}</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{signLabel(f.sign,language)}</span></div>
          </div>
          <div style={{flexShrink:0,textAlign:"right"}}><span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:8,background:`${il.color}18`,color:il.color,border:`1px solid ${il.color}33`,display:"block",whiteSpace:"nowrap"}}>{il.label}</span><div style={{fontSize:10,color:C.muted,marginTop:3}}>{t("compatibleSignsViewMore")}</div></div>
        </div>;
      })}
    </div>
    <div style={{marginTop:14,background:`${C.violet}10`,border:`1px solid ${C.violetDim}33`,borderRadius:12,padding:12}}><p style={{fontSize:11,color:C.muted,lineHeight:1.6,margin:0}}>{t("compatibleSignsFooterNote")}</p></div>
  </div>;
}

// ── SINASTRÍA / AMOR VIEW ────────────────────────────────
function AmorView({myChart,myProfile,loggedEmail}){
  const{t,language}=useLanguage();
  const[mode,setMode]=useState(null);
  const[mySign,setMySign]=useState(myChart?signOf(myChart.planets.Sol.lon):null);
  const[theirSign,setTheirSign]=useState(null);
  const[signStep,setSignStep]=useState(mySign?2:1);
  const[theirForm,setTheirForm]=useState({name:"",relacion:"",birthdate:"",birthtime:"12:00",city:null});
  const[chartStep,setChartStep]=useState(0); // 0 = elegir guardada o nueva
  const[result,setResult]=useState(null);
  const[openSec,setOpenSec]=useState(null);
  const[savedPeople,setSavedPeople]=useState([]);
  const[loadingPeople,setLoadingPeople]=useState(false);
  const[saveAfter,setSaveAfter]=useState(true);
  const[synastryLoading,setSynastryLoading]=useState(false);
  const[synastryError,setSynastryError]=useState(null);

  useEffect(()=>{
    if(!loggedEmail) return;
    setLoadingPeople(true);
    sb.getPersonas(loggedEmail).then(setSavedPeople).catch(()=>{}).finally(()=>setLoadingPeople(false));
  },[loggedEmail]);

  function setTF(k,v){setTheirForm(f=>({...f,[k]:v}));}
  function calcSignCompat(signA, signB){
    const s1=signA||mySign, s2=signB||theirSign;
    const score=Math.min(97,Math.max(32,(COMPAT_MATRIX[ELEM[s1]]?.[ELEM[s2]]||60)+Math.floor(Math.random()*16)-8));
    const texts=getCompatText(s1,s2,undefined,undefined,language);
    const categories=getCompatCategories(score,s1,s2);
    setResult({score,type:"sign",s1,s2,texts,categories});
  }
  async function calcChartCompat(){
    setSynastryLoading(true);
    setSynastryError(null);
    try{
      const c=theirForm.city;
      const tc=await calcChart(theirForm.birthdate,theirForm.birthtime,c.lat,c.lon,c.n);
      const s1=signOf(myChart.planets.Sol.lon),s2=signOf(tc.planets.Sol.lon);
      const score=Math.min(97,Math.max(32,(COMPAT_MATRIX[ELEM[s1]]?.[ELEM[s2]]||60)+Math.floor(Math.random()*18)-9));
      const ias=[];for(const[pA,dA]of Object.entries(myChart.planets))for(const[pB,dB]of Object.entries(tc.planets)){const a=findAspect(dA.lon,dB.lon);if(a&&a.type!=="minor")ias.push({pA,pB,...a});}
      const top=ias.sort((a,b)=>parseFloat(a.exact)-parseFloat(b.exact)).slice(0,5);
      const texts=getCompatText(s1,s2,myProfile?.name,theirForm.name,language);
      const categories=getCompatCategories(score,s1,s2);
      const karmic=getKarmicInsight(myChart,tc,language);
      setResult({score,type:"chart",s1,s2,theirName:theirForm.name,theirChart:tc,interAspects:top,texts,categories,karmic});
      // Guardar o actualizar la persona en Supabase. Si venimos de "editar" (_editId presente),
      // actualizamos ESE registro exacto. Si no, usamos upsert por nombre para evitar duplicados.
      if(loggedEmail && saveAfter){
        const personaData = {
          nombre:theirForm.name, relacion:theirForm.relacion||"Otro",
          birthdate:theirForm.birthdate, birthtime:theirForm.birthtime,
          city:c.n, lat:c.lat, lon:c.lon,
        };
        const savePromise = theirForm._editId
          ? sb.updatePersona(theirForm._editId, personaData)
          : sb.upsertPersona(loggedEmail, personaData);
        savePromise.then(()=>sb.getPersonas(loggedEmail).then(setSavedPeople)).catch(e=>console.error("Error guardando persona:",e));
      }
    }catch(e){
      console.error(e);
      setSynastryError(e.message || String(e));
    }
    setSynastryLoading(false);
  }
  function reset(){setMode(null);setResult(null);setTheirSign(null);setSignStep(mySign?2:1);setChartStep(0);setTheirForm({name:"",relacion:"",birthdate:"",birthtime:"12:00",city:null});setSynastryError(null);}
  const inp={width:"100%",background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 14px",color:C.white,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
  const SECS=[{key:"quimica",label:t("amorSecQuimica"),icon:"💕",color:C.pink},{key:"desafio",label:t("amorSecDesafio"),icon:"⚡",color:C.warn},{key:"potencial",label:t("amorSecPotencial"),icon:"🌟",color:C.violet},{key:"consejo",label:t("amorSecConsejo"),icon:"🧭",color:C.gold}];

  if(synastryLoading) return <div style={{padding:16,textAlign:"center",paddingTop:60}}>
    <div style={{fontSize:48,marginBottom:14}}>🌌</div>
    <p style={{color:C.muted,fontSize:13}}>{t("amorCalculatingSynastry")}</p>
    <p style={{color:C.mutedDark,fontSize:11,marginTop:8}}>{t("amorMayTakeSeconds")}</p>
  </div>;

  if(synastryError) return <div style={{padding:16}}>
    <button onClick={()=>{setSynastryError(null);}} style={{background:"none",border:"none",color:C.violet,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit",marginBottom:14}}>{t("amorBack")}</button>
    <div style={{textAlign:"center",paddingTop:30}}>
      <div style={{fontSize:36,marginBottom:12}}>⚠️</div>
      <h3 style={{color:C.danger,fontSize:15,fontWeight:700,marginBottom:10}}>{t("amorCouldNotCalculate")}</h3>
      <div style={{background:C.bgDeep,border:`1px solid ${C.danger}44`,borderRadius:10,padding:12,marginBottom:14,textAlign:"left"}}>
        <p style={{color:C.white,fontSize:11,fontFamily:"monospace",margin:0,wordBreak:"break-word"}}>{synastryError}</p>
      </div>
      <GoldBtn onClick={()=>{setSynastryError(null);setChartStep(1);}}>{t("amorTryAgain")}</GoldBtn>
    </div>
  </div>;

  if(result){
    const sc=result.score>=75?C.success:result.score>=55?C.gold:C.danger;
    return <div style={{padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h2 style={{color:C.gold,fontSize:15,fontWeight:700,margin:0}}>{t("amorResultTitle")}</h2><GhostBtn onClick={reset}>{t("amorNewQuery")}</GhostBtn></div>
      <Card style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"center",gap:20,marginBottom:14}}>
          {[{s:result.s1,n:myProfile?.name||t("amorYou")},{s:result.s2,n:result.theirName||t("amorHerHim")}].map((p,i)=>(
            <div key={i} style={{textAlign:"center"}}><div style={{fontSize:30}}>{SIGNS_LIST.find(x=>x.name===p.s)?.glyph||"✨"}</div><div style={{fontSize:11,color:SIGNS_LIST.find(x=>x.name===p.s)?.color||C.gold,fontWeight:700}}>{signLabel(p.s,language)}</div><div style={{fontSize:9,color:C.muted}}>{p.n?.split(" ")[0]}</div></div>
          ))}
        </div>
        <div style={{textAlign:"center",marginBottom:8}}><div style={{fontSize:44,fontWeight:800,color:sc}}>{result.score}%</div><div style={{fontSize:11,color:C.muted}}>{t("amorCompatibilityLabel")}</div><div style={{background:C.bgMid,borderRadius:6,height:6,margin:"10px auto 0",maxWidth:200,overflow:"hidden"}}><div style={{width:`${result.score}%`,height:"100%",background:sc,borderRadius:6,transition:"width 1s ease"}} /></div></div>
        {result.categories&&<div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`}}>
          {[{key:"love",label:t("amorCatLove"),icon:"💗",color:C.pink},{key:"emotional",label:t("amorCatEmotional"),icon:"💧",color:C.cyan},{key:"communication",label:t("amorCatCommunication"),icon:"💬",color:C.violet},{key:"trust",label:t("amorCatTrust"),icon:"🛡️",color:C.teal},{key:"intimacy",label:t("amorCatIntimacy"),icon:"🔥",color:C.warn}].map(cat=>(
            <div key={cat.key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{fontSize:13,width:18,flexShrink:0}}>{cat.icon}</div>
              <div style={{fontSize:11,color:C.muted,width:90,flexShrink:0}}>{cat.label}</div>
              <div style={{flex:1,background:C.bgMid,borderRadius:6,height:6,overflow:"hidden"}}><div style={{width:`${result.categories[cat.key]}%`,height:"100%",background:cat.color,borderRadius:6}} /></div>
              <div style={{fontSize:11,color:C.white,fontWeight:700,width:30,textAlign:"right",flexShrink:0}}>{result.categories[cat.key]}%</div>
            </div>
          ))}
        </div>}
        {result.type==="chart"&&result.interAspects?.length>0&&<SinastriaDetalle interAspects={result.interAspects} s1={result.s1} s2={result.s2} theirName={result.theirName} myProfile={myProfile} />}
      </Card>
      <Card style={{marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{fontSize:18}}>☊</div>
          <div style={{fontSize:13,fontWeight:700,color:C.gold}}>{t("amorKarmicTitle")}</div>
          {result.karmic&&<Pill color={result.karmic.level==="alta"?C.danger:result.karmic.level==="media"?C.warn:C.teal} style={{marginLeft:"auto",fontSize:9}}>{t(`amorKarmicLevel${result.karmic.level==="alta"?"Alta":result.karmic.level==="media"?"Media":"Baja"}`)}</Pill>}
        </div>
        {!result.karmic&&<p style={{fontSize:12,color:C.muted,lineHeight:1.6,margin:0}}>{t("amorKarmicNeedChart")}</p>}
        {result.karmic&&result.karmic.hits.length===0&&<p style={{fontSize:12,color:C.muted,lineHeight:1.6,margin:0}}>{t("amorKarmicNoHits")}</p>}
        {result.karmic&&result.karmic.hits.length>0&&<ul style={{margin:0,paddingLeft:18}}>
          {result.karmic.hits.map((hit,i)=>(<li key={i} style={{fontSize:12,color:C.white,lineHeight:1.6,marginBottom:6}}>{hit}</li>))}
        </ul>}
      </Card>
      {SECS.map(sec=>{const content=result.texts[sec.key];if(!content)return null;const isOpen=openSec===sec.key;const preview=content.split(/[.!?]/)[0].trim();
        return <div key={sec.key} onClick={()=>setOpenSec(isOpen?null:sec.key)} style={{background:C.bgCard,border:`1px solid ${isOpen?sec.color+"55":C.border}`,borderRadius:14,padding:12,marginBottom:8,cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:"50%",background:`${sec.color}18`,border:`1px solid ${sec.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{sec.icon}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:10,color:sec.color,fontWeight:700,marginBottom:1}}>{sec.label.toUpperCase()}</div>{!isOpen&&<div style={{fontSize:11,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{preview}…</div>}</div><div style={{fontSize:14,color:C.muted,flexShrink:0,transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</div></div>
          {isOpen&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}><p style={{fontSize:13,color:C.white,lineHeight:1.7,margin:0}}>{content}</p></div>}
        </div>;
      })}
    </div>;
  }
  if(mode==="compatibleSigns")return <CompatibleSignsView chart={myChart} profile={myProfile} onBack={()=>setMode(null)} />;
  if(!mode)return <div style={{padding:16}}>
    <div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:40,marginBottom:8}}>💕</div><h2 style={{color:C.gold,fontSize:17,fontWeight:800,margin:"0 0 6px"}}>{t("amorTitle")}</h2><p style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{t("amorSubtitle")}</p></div>
    <div style={{display:"flex",flexDirection:"column",gap:10}}>

      {/* OPCIÓN 1 — más simple */}
      <div onClick={()=>setMode("signOnly")} style={{background:C.bgCard,border:`1px solid ${C.violet}44`,borderRadius:16,padding:16,cursor:"pointer",position:"relative"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.violet} onMouseLeave={e=>e.currentTarget.style.borderColor=`${C.violet}44`}>
        <div style={{position:"absolute",top:-8,left:14,background:C.violet,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:8}}>{t("amorStartHere")}</div>
        <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${C.violet}18`,border:`1px solid ${C.violet}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>♈</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.violet,marginBottom:4}}>{t("amorOption1Title")}</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.55}}>
              {t("amorOption1Desc")}
            </div>
          </div>
        </div>
      </div>

      {/* OPCIÓN 2 — propia carta */}
      <div onClick={()=>myChart?setMode("compatibleSigns"):null} style={{background:C.bgCard,border:`1px solid ${myChart?C.teal+"44":C.border}`,borderRadius:16,padding:16,cursor:myChart?"pointer":"not-allowed",opacity:myChart?1:0.5}} onMouseEnter={e=>myChart&&(e.currentTarget.style.borderColor=C.teal)} onMouseLeave={e=>e.currentTarget.style.borderColor=myChart?`${C.teal}44`:C.border}>
        <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${C.teal}18`,border:`1px solid ${C.teal}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🔍</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.teal,marginBottom:4}}>{t("amorOption2Title")}</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.55}}>
              {t("amorOption2Desc")}
            </div>
            {!myChart&&<div style={{fontSize:11,color:C.warn,marginTop:6}}>{t("amorOption2Warn")}</div>}
          </div>
        </div>
      </div>

      {/* OPCIÓN 3 — sinastría con otra persona */}
      <div onClick={()=>setMode("chartFull")} style={{background:C.bgCard,border:`1px solid ${C.gold}44`,borderRadius:16,padding:16,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=`${C.gold}44`}>
        <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${C.gold}18`,border:`1px solid ${C.gold}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>💑</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.gold,marginBottom:4}}>{t("amorOption3Title")}</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.55}}>
              {t("amorOption3Desc")}
            </div>
            {!myChart&&<div style={{fontSize:11,color:C.warn,marginTop:6}}>{t("amorOption3Warn")}</div>}
          </div>
        </div>
      </div>

      {/* OPCIÓN 4 — ranking contra los 12 signos */}
      <div onClick={()=>(myChart||mySign)?setMode("topMatches"):null} style={{background:C.bgCard,border:`1px solid ${(myChart||mySign)?C.pink+"44":C.border}`,borderRadius:16,padding:16,cursor:(myChart||mySign)?"pointer":"not-allowed",opacity:(myChart||mySign)?1:0.5}} onMouseEnter={e=>(myChart||mySign)&&(e.currentTarget.style.borderColor=C.pink)} onMouseLeave={e=>e.currentTarget.style.borderColor=(myChart||mySign)?`${C.pink}44`:C.border}>
        <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${C.pink}18`,border:`1px solid ${C.pink}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🏆</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.pink,marginBottom:4}}>{t("amorOption4Title")}</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.55}}>
              {t("amorOption4Desc")}
            </div>
            {!(myChart||mySign)&&<div style={{fontSize:11,color:C.warn,marginTop:6}}>{t("amorOption4Warn")}</div>}
          </div>
        </div>
      </div>
    </div>
  </div>;
  if(mode==="topMatches")return <TopMatchesView mySign={mySign} onBack={reset} />;
  if(mode==="signOnly")return <div style={{padding:16}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><button onClick={reset} style={{background:"none",border:"none",color:C.violet,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{t("amorBack")}</button><h2 style={{color:C.gold,fontSize:14,fontWeight:700,margin:0}}>{t("amorBySignTitle")}</h2></div>
    <p style={{color:C.muted,fontSize:13,marginBottom:12}}>{signStep===1?t("amorYourSign"):t("amorYourSignSelected")}</p>
    {signStep===2&&mySign&&<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 14px"}}><span style={{fontSize:22}}>{SIGNS_LIST.find(x=>x.name===mySign)?.glyph}</span><span style={{color:SIGNS_LIST.find(x=>x.name===mySign)?.color,fontWeight:700}}>{signLabel(mySign,language)}</span>{myChart&&<Pill color={C.teal} style={{fontSize:9}}>{t("amorYourNatalSign")}</Pill>}<button onClick={()=>setSignStep(1)} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",marginLeft:"auto",fontFamily:"inherit"}}>{t("amorChange")}</button></div>}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:8}}>
      {SIGNS_LIST.filter(s=>signStep===2?s.name!==mySign:true).map(sign=>(
        <button key={sign.name} onClick={()=>{if(signStep===1){setMySign(sign.name);setSignStep(2);}else{setTheirSign(sign.name);calcSignCompat(mySign,sign.name);}}} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 6px",cursor:"pointer",textAlign:"center",fontFamily:"inherit"}} onMouseEnter={e=>e.currentTarget.style.borderColor=sign.color} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
          <div style={{fontSize:22,marginBottom:4}}>{sign.glyph}</div><div style={{fontSize:9,color:C.muted,fontWeight:600}}>{signLabel(sign.name,language)}</div>
        </button>
      ))}
    </div>
  </div>;
  if(mode==="chartFull"){
    if(!myChart)return <div style={{padding:16,textAlign:"center"}}><div style={{fontSize:40,marginBottom:12}}>🌌</div><p style={{color:C.muted,fontSize:13,marginBottom:16}}>{t("amorNeedChartFirst")}</p><GhostBtn onClick={reset}>{t("amorBack")}</GhostBtn></div>;

    // PASO 0: elegir persona guardada o agregar nueva
    if(chartStep===0) return <div style={{padding:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><button onClick={reset} style={{background:"none",border:"none",color:C.violet,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{t("amorBack")}</button><h2 style={{color:C.gold,fontSize:14,fontWeight:700,margin:0}}>{t("amorOtherPersonTitle")}</h2></div>

      {loadingPeople && <p style={{color:C.muted,fontSize:13,textAlign:"center",padding:20}}>{t("amorLoadingSaved")}</p>}

      {!loadingPeople && savedPeople.length > 0 && <>
        <p style={{color:C.muted,fontSize:12,marginBottom:10}}>{t("amorSavedPeople")}</p>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
          {savedPeople.map(p=>(
            <div key={p.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
              <div onClick={()=>{
                setTheirForm({name:p.nombre,relacion:p.relacion,birthdate:p.birthdate,birthtime:p.birthtime,city:{n:p.city,lat:p.lat,lon:p.lon},_fromSaved:true,_editId:p.id});
                setTimeout(()=>{ calcChartCompat(); },50);
              }} style={{flex:1,display:"flex",alignItems:"center",gap:10,cursor:"pointer",minWidth:0}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:`${C.pink}18`,border:`1px solid ${C.pink}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>💕</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.white}}>{p.nombre}</div>
                  <div style={{fontSize:11,color:C.muted}}>{p.relacion} · {p.birthdate}</div>
                </div>
              </div>
              <button onClick={()=>{
                setTheirForm({name:p.nombre,relacion:p.relacion,birthdate:p.birthdate,birthtime:p.birthtime,city:{n:p.city,lat:p.lat,lon:p.lon},_editId:p.id});
                setChartStep(1);
              }} style={{background:"none",border:"none",color:C.teal,fontSize:14,cursor:"pointer",padding:4,flexShrink:0}}>✏️</button>
              <button onClick={()=>{sb.deletePersona(p.id).then(()=>sb.getPersonas(loggedEmail).then(setSavedPeople));}} style={{background:"none",border:"none",color:C.muted,fontSize:16,cursor:"pointer",padding:4,flexShrink:0}}>🗑</button>
            </div>
          ))}
        </div>
      </>}

      <GoldBtn onClick={()=>{setTheirForm({name:"",relacion:"",birthdate:"",birthtime:"12:00",city:null});setChartStep(1);}} style={{width:"100%"}}>{t("amorAddNewPerson")}</GoldBtn>
    </div>;

    const canGo=chartStep===1?theirForm.name.trim().length>1&&!!theirForm.relacion:chartStep===2?!!(theirForm.birthdate&&theirForm.birthtime):!!theirForm.city;
    return <div style={{padding:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><button onClick={chartStep>1?()=>setChartStep(s=>s-1):()=>setChartStep(0)} style={{background:"none",border:"none",color:C.violet,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{t("amorBack")}</button><h2 style={{color:C.gold,fontSize:14,fontWeight:700,margin:0}}>{theirForm._editId?t("amorEditPerson"):t("amorNewPerson")}</h2><div style={{marginLeft:"auto",display:"flex",gap:5}}>{[1,2,3].map(s=><div key={s} style={{width:22,height:22,borderRadius:"50%",background:chartStep>=s?C.gold:C.mutedDark,color:chartStep>=s?"#1a0d00":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{s}</div>)}</div></div>
      <Card>
        {chartStep===1&&<>
          <div style={{fontSize:20,textAlign:"center",marginBottom:10}}>👤</div>
          <h3 style={{color:C.white,fontSize:14,fontWeight:700,marginBottom:12,textAlign:"center"}}>{t("amorWhoIsThisPerson")}</h3>
          <label style={{fontSize:10,color:C.muted,fontWeight:600,display:"block",marginBottom:5}}>{t("amorNameLabel")}</label>
          <input value={theirForm.name} onChange={e=>setTF("name",e.target.value)} placeholder={t("amorNamePlaceholder")} autoFocus style={{...inp,marginBottom:12}} />
          <label style={{fontSize:10,color:C.muted,fontWeight:600,display:"block",marginBottom:5}}>{t("amorRelationLabel")}</label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {[{val:"Pareja",key:"amorRelPareja"},{val:"Crush",key:"amorRelCrush"},{val:"Amistad",key:"amorRelAmistad"},{val:"Familia",key:"amorRelFamilia"},{val:"Ex",key:"amorRelEx"},{val:"Otro",key:"amorRelOtro"}].map(r=>(
              <button key={r.val} onClick={()=>setTF("relacion",r.val)} style={{background:theirForm.relacion===r.val?`${C.gold}22`:"transparent",border:`1px solid ${theirForm.relacion===r.val?C.gold:C.border}`,borderRadius:20,padding:"6px 12px",fontSize:12,fontWeight:600,color:theirForm.relacion===r.val?C.gold:C.muted,cursor:"pointer",fontFamily:"inherit"}}>{t(r.key)}</button>
            ))}
          </div>
        </>}
        {chartStep===2&&<><div style={{fontSize:20,textAlign:"center",marginBottom:10}}>📅</div><h3 style={{color:C.white,fontSize:14,fontWeight:700,marginBottom:12,textAlign:"center"}}>{t("amorDateOf",{name:theirForm.name})}</h3>
          <label style={{fontSize:10,color:C.muted,fontWeight:600,display:"block",marginBottom:5}}>{t("perfilDateLabel")}</label>
          <input type="date" value={theirForm.birthdate} onChange={e=>setTF("birthdate",e.target.value)} style={{...inp,colorScheme:"dark",marginBottom:12}} />
          <label style={{fontSize:10,color:C.muted,fontWeight:600,display:"block",marginBottom:5}}>{t("perfilTimeLabel")} <span style={{color:C.mutedDark,fontWeight:400}}>{t("perfilTimeHint")}</span></label>
          <input type="time" value={theirForm.birthtime} onChange={e=>setTF("birthtime",e.target.value)} style={{...inp,colorScheme:"dark"}} />
        </>}
        {chartStep===3&&<>
          <div style={{fontSize:20,textAlign:"center",marginBottom:10}}>📍</div>
          <h3 style={{color:C.white,fontSize:14,fontWeight:700,marginBottom:12,textAlign:"center"}}>{t("amorCityOf",{name:theirForm.name})}</h3>
          <CitySearch value={theirForm.city} onChange={c=>setTF("city",c)} />
          {loggedEmail && <label style={{display:"flex",alignItems:"center",gap:8,marginTop:16,cursor:"pointer"}}>
            <input type="checkbox" checked={saveAfter} onChange={e=>setSaveAfter(e.target.checked)} style={{width:16,height:16,cursor:"pointer"}} />
            <span style={{fontSize:12,color:C.muted}}>{t("amorSaveCheckbox",{name:theirForm.name||t("amorThisPerson")})}</span>
          </label>}
        </>}
      </Card>
      <div style={{marginTop:14}}>{chartStep<3?<GoldBtn onClick={()=>setChartStep(s=>s+1)} disabled={!canGo} style={{width:"100%"}}>{t("amorContinue")}</GoldBtn>:<GoldBtn onClick={calcChartCompat} disabled={!canGo} style={{width:"100%"}}>{theirForm._editId?t("amorSaveAndCalculate"):t("amorCalculateSynastry")}</GoldBtn>}</div>
    </div>;
  }
  return null;
}

// ── PANTALLA DE CONFIGURACIÓN ─────────────────────────────
function SettingsPanel({ loggedEmail, onClose, onEditProfile, onLogout }){
  const{t}=useLanguage();
  const[showContact,setShowContact]=useState(false);
  const[showHotmartCancelHelp,setShowHotmartCancelHelp]=useState(false);
  const[showChangePlanHelp,setShowChangePlanHelp]=useState(false);

  function handleCancelSubscription(){
    setShowHotmartCancelHelp(true);
  }

  function handleChangePlan(){
    setShowChangePlanHelp(true);
  }

  const Row=({icon,label,onClick,danger})=>(
    <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",cursor:onClick?"pointer":"default",borderBottom:`1px solid ${C.border}`}}>
      <span style={{fontSize:16,width:20,textAlign:"center",color:danger?C.danger:C.gold}}>{icon}</span>
      <span style={{fontSize:14,color:danger?C.danger:C.white,flex:1}}>{label}</span>
      {onClick&&<span style={{color:C.muted,fontSize:14}}>›</span>}
    </div>
  );

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:600,overflowY:"auto"}}>
    <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",background:C.bg}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:C.bgMid,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0}}>
        <span style={{color:C.gold,fontWeight:700,fontSize:16}}>{t("settingsTitle")}</span>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer"}}>×</button>
      </div>

      <div style={{padding:"20px 16px 8px"}}>
        <h3 style={{fontSize:13,fontWeight:700,color:C.muted,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:0.5}}>{t("settingsMyProfile")}</h3>
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
          <Row icon="👤" label={t("settingsEditChart")} onClick={onEditProfile} />
          <Row icon="✉️" label={loggedEmail} />
        </div>
      </div>

      <div style={{padding:"16px 16px 8px"}}>
        <h3 style={{fontSize:13,fontWeight:700,color:C.muted,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:0.5}}>{t("settingsMyAccount")}</h3>
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
          <Row icon="🚫" label={t("settingsCancelSubscription")} onClick={handleCancelSubscription} />
          <Row icon="🔄" label={t("settingsChangePlan")} onClick={handleChangePlan} />
          <Row icon="ℹ️" label={t("settingsHelpCenter")} onClick={()=>setShowContact(v=>!v)} />
          <Row icon="✉️" label={t("settingsContactUs")} onClick={()=>setShowContact(v=>!v)} />
        </div>
        {showContact&&<p style={{color:C.muted,fontSize:12,marginTop:10,lineHeight:1.5}}>
          {t("settingsContactMessage")} <span style={{color:C_ACCESS.gold}}>atencionalcoientem@gmail.com</span>
        </p>}
      </div>

      <div style={{padding:"16px 16px 32px"}}>
        <button onClick={onLogout} style={{width:"100%",background:C.gold,color:"#1a0d00",border:"none",borderRadius:14,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{t("settingsLogout")}</button>
      </div>
    </div>

    {showHotmartCancelHelp&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setShowHotmartCancelHelp(false)}>
      <div style={{maxWidth:420,width:"100%",background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20}} onClick={e=>e.stopPropagation()}>
        <h3 style={{color:C.gold,fontSize:16,fontWeight:700,marginBottom:14}}>{t("settingsHotmartCancelTitle")}</h3>
        <p style={{color:C.white,fontSize:13,lineHeight:1.6,marginBottom:10}}>{t("settingsHotmartStep1")}</p>
        <a href="https://hotmart.com/co" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",color:"#1a0d00",background:C.gold,borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:700,textDecoration:"none",marginBottom:14}}>{t("settingsHotmartStep1Link")}</a>
        <p style={{color:C.white,fontSize:13,lineHeight:1.6,marginBottom:10}}>{t("settingsHotmartStep2")}</p>
        <p style={{color:C.white,fontSize:13,lineHeight:1.6,marginBottom:10}}>{t("settingsHotmartStep3")}</p>
        <p style={{color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:16}}>{t("settingsHotmartCancelFallback")} <span style={{color:C_ACCESS.gold}}>atencionalcoientem@gmail.com</span></p>
        <button onClick={()=>setShowHotmartCancelHelp(false)} style={{width:"100%",background:C.gold,color:"#1a0d00",border:"none",borderRadius:12,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{t("settingsHotmartClose")}</button>
      </div>
    </div>}

    {showChangePlanHelp&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setShowChangePlanHelp(false)}>
      <div style={{maxWidth:420,width:"100%",background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20}} onClick={e=>e.stopPropagation()}>
        <h3 style={{color:C.gold,fontSize:16,fontWeight:700,marginBottom:14}}>{t("settingsChangePlanTitle")}</h3>
        <p style={{color:C.white,fontSize:13,lineHeight:1.6,marginBottom:16}}>{t("settingsChangePlanMessage")} <span style={{color:C_ACCESS.gold}}>atencionalcoientem@gmail.com</span></p>
        <button onClick={()=>setShowChangePlanHelp(false)} style={{width:"100%",background:C.gold,color:"#1a0d00",border:"none",borderRadius:12,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{t("settingsHotmartClose")}</button>
      </div>
    </div>}
  </div>;
}

// ── APP PRINCIPAL ─────────────────────────────────────────
function CosmicallApp({ loggedEmail, isAdmin, onOpenAdmin, onLogout }){
  const{t:tr,language}=useLanguage();
  const[tab,setTab]=useState("inicio");
  const[profile,setProfile]=useState(null);
  const[chart,setChart]=useState(null);
  const[transits,setTransits]=useState(null);
  const[transitAspects,setTransitAspects]=useState([]);
  const[oracle,setOracle]=useState(null);
  const[showProfile,setShowProfile]=useState(false);
  const[showSettings,setShowSettings]=useState(false);
  const[calcMsg,setCalcMsg]=useState("");
  const[showMore,setShowMore]=useState(false);
  const[loadingProfile,setLoadingProfile]=useState(true);
  const[saveError,setSaveError]=useState(null);

  useEffect(()=>{
    const t=calcTransits();
    setTransits(t);
  },[]);

  // Cargar perfil guardado en Supabase al iniciar sesión
  useEffect(()=>{
    if(!loggedEmail) { setLoadingProfile(false); return; }
    (async()=>{
      try{
        const saved = await sb.getPerfil(loggedEmail);
        if(saved){
          const p = {
            name: saved.nombre, genero: saved.genero, avatar: saved.avatar,
            birthdate: saved.birthdate, birthtime: saved.birthtime,
            city: saved.city, lat: saved.lat, lon: saved.lon,
          };
          const newChart = await calcChart(p.birthdate, p.birthtime, p.lat||4.7, p.lon||-74.0, p.city);
          const newTransits = calcTransits();
          const newTA = findTransitAspects(newChart, newTransits);
          setProfile(p); setChart(newChart); setTransits(newTransits); setTransitAspects(newTA);
        }
      }catch(e){ console.error("Error cargando perfil:", e); }
      setLoadingProfile(false);
    })();
  },[loggedEmail]);

  useEffect(()=>{
    if(!transits)return;
    // Generar oráculo del día (sin API)
    const o=getOracleForToday(chart,transits,language);
    setOracle(o);
  },[transits,chart,language]);

  async function saveProfile(p){
    setCalcMsg(tr("appCalculatingChart"));
    try{
      const lonForTZ=p.lon||-74.0;
      const newChart=await calcChart(p.birthdate,p.birthtime,p.lat||4.7,lonForTZ,p.city);
      const newTransits=calcTransits(),newTA=findTransitAspects(newChart,newTransits);

      // Guardar en Supabase ANTES de actualizar la UI, para detectar errores
      if(loggedEmail){
        setCalcMsg(tr("appSavingProfile"));
        try{
          await sb.savePerfil(loggedEmail, p);
        }catch(saveErr){
          console.error("Error guardando perfil en Supabase:", saveErr);
          // Error PERSISTENTE — no desaparece solo, el usuario debe tocar "Continuar" para verlo completo
          setSaveError({
            message: saveErr.message || String(saveErr),
            pendingChart: newChart, pendingTransits: newTransits, pendingTA: newTA, pendingProfile: p,
          });
          setCalcMsg("");
          return;
        }
      }

      setProfile({...p});setChart(newChart);setTransits(newTransits);setTransitAspects(newTA);
      const newOracle=getOracleForToday(newChart,newTransits,language);setOracle(newOracle);
      setShowProfile(false);setCalcMsg("");setTab("carta");
    }catch(e){
      console.error(e);
      setCalcMsg(tr("appCalcError",{error:e.message || e}));
    }
  }

  function dismissSaveError(){
    if(saveError){
      setProfile({...saveError.pendingProfile});setChart(saveError.pendingChart);
      setTransits(saveError.pendingTransits);setTransitAspects(saveError.pendingTA);
      const newOracle=getOracleForToday(saveError.pendingChart,saveError.pendingTransits,language);setOracle(newOracle);
      setSaveError(null);setShowProfile(false);setTab("carta");
    }
  }

  const moon=getMoonPhase();
  const NAV=[{id:"inicio",icon:"🏠",label:tr("appNavInicio")},{id:"carta",icon:"🌌",label:tr("appNavCarta")},{id:"amor",icon:"💕",label:tr("appNavAmor")},{id:"tarot",icon:"🃏",label:tr("appNavTarot")},{id:"mas",icon:"📅",label:tr("appNavMas")}];
  const MORE=[{id:"horoscopo",icon:"♈",label:"Signos"}];

  return <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI', system-ui, sans-serif",maxWidth:480,margin:"0 auto",color:C.white,position:"relative"}}>
    <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 0; height: 0; } input[type="date"]::-webkit-calendar-picker-indicator, input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(0.7); cursor: pointer; } button { font-family: inherit; } input { font-family: inherit; }`}</style>

    {/* Header */}
    <header style={{background:C.bgMid,borderBottom:`1px solid ${C.border}`,padding:"11px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>✨</span><span style={{fontSize:17,fontWeight:800,color:C.gold,letterSpacing:-0.5}}>{tr("appHeaderBrand")}</span><span style={{fontSize:11,color:C.muted,marginLeft:2}}>{moon.emoji}</span></div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {profile&&<span style={{fontSize:11,color:C.teal,fontWeight:600}}>{chart&&`${signLabel(chart.planets.Sol.sign,language)} · Asc ${signLabel(chart.ascSign,language)}`}</span>}
        {isAdmin&&<button onClick={onOpenAdmin} style={{background:"#e0406020",border:"1px solid #e0406044",borderRadius:20,padding:"5px 10px",color:"#e04060",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{tr("appAdminButton")}</button>}
        <button onClick={()=>setShowProfile(true)} style={{background:profile?`${C.teal}22`:`${C.violet}22`,border:`1px solid ${profile?C.teal:C.violetDim}`,borderRadius:20,padding:"5px 12px",color:profile?C.teal:C.violet,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{profile?`✏️ ${profile.name.split(" ")[0]}`:tr("appMyChartButton")}</button>
        <LanguageToggle />
        <button onClick={()=>setShowSettings(true)} aria-label={tr("appSettingsAria")} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:20,width:30,height:30,color:C.muted,fontSize:14,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>⚙️</button>
      </div>
    </header>

    {/* Modal configuración */}
    {showSettings&&<SettingsPanel loggedEmail={loggedEmail} onClose={()=>setShowSettings(false)} onEditProfile={()=>{setShowSettings(false);setShowProfile(true);}} onLogout={onLogout} />}

    {/* Modal perfil */}
    {showProfile&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:500,overflowY:"auto"}}>
      <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",background:C.bg}}>
        <div style={{display:"flex",justifyContent:"space-between",padding:"14px 16px",background:C.bgMid,borderBottom:`1px solid ${C.border}`}}><span style={{color:C.gold,fontWeight:700,fontSize:15}}>{tr("appProfileModalTitle")}</span><button onClick={()=>setShowProfile(false)} style={{background:"none",border:"none",color:C.muted,fontSize:20,cursor:"pointer"}}>×</button></div>
        {saveError ? (
          <div style={{padding:24}}>
            <div style={{fontSize:36,textAlign:"center",marginBottom:12}}>⚠️</div>
            <h3 style={{color:C.danger,fontSize:15,fontWeight:700,marginBottom:10,textAlign:"center"}}>{tr("appSaveErrorTitle")}</h3>
            <p style={{color:C.muted,fontSize:12,marginBottom:12,textAlign:"center"}}>{tr("appSaveErrorDesc")}</p>
            <div style={{background:C.bgDeep,border:`1px solid ${C.danger}44`,borderRadius:10,padding:12,marginBottom:14}}>
              <p style={{color:C.white,fontSize:11,fontFamily:"monospace",margin:0,wordBreak:"break-word",userSelect:"all"}}>{saveError.message}</p>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{navigator.clipboard?.writeText(saveError.message);}} style={{flex:1,background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{tr("appCopyError")}</button>
              <button onClick={dismissSaveError} style={{flex:1,background:C.gold,border:"none",borderRadius:10,padding:"11px",color:"#1a0d00",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{tr("appContinue")}</button>
            </div>
          </div>
        ) : calcMsg?<div style={{textAlign:"center",padding:48}}><div style={{fontSize:40,marginBottom:12}}>🌌</div><p style={{color:C.muted}}>{calcMsg}</p></div>:<PerfilForm onSave={saveProfile} />}
      </div>
    </div>}

    {/* Contenido */}
    <main style={{paddingBottom:64,minHeight:"calc(100vh - 52px)",overflowY:"auto"}}>

      {/* INICIO */}
      {tab==="inicio"&&<div>
        {!profile&&<div style={{margin:"16px 16px 0",background:`${C.violet}15`,border:`1px solid ${C.violetDim}44`,borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:2}}>{tr("appActivateChart")}</div><div style={{fontSize:11,color:C.muted}}>{tr("appActivateChartDesc")}</div></div>
          <button onClick={()=>setShowProfile(true)} style={{background:C.gold,color:"#1a0d00",border:"none",borderRadius:24,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{tr("appMyChartButton")}</button>
        </div>}
        <OracleCard oracle={oracle} profile={profile} chart={chart} transits={transits} setTab={setTab} />
        {profile && chart && <BiorhythmCard birthdate={profile.birthdate} />}
        <div style={{padding:"4px 16px 20px",display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:10}}>
          {[{icon:"🃏",label:tr("appTileTarotLabel"),desc:tr("appTileTarotDesc"),tab:"tarot",color:C.teal},{icon:"⚙️",label:tr("appTileMoreLabel"),desc:tr("appTileMoreDesc"),tab:"horoscopo",color:C.violet}].map(item=>(
            <div key={item.tab} onClick={()=>setTab(item.tab)} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:14,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.borderColor=item.color} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{fontSize:24,marginBottom:8}}>{item.icon}</div><div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:3}}>{item.label}</div><div style={{fontSize:10,color:C.muted}}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>}

      {/* CARTA */}
      {tab==="carta"&&<div style={{padding:16}}>
        <h2 style={{color:C.gold,fontSize:15,fontWeight:700,margin:"0 0 14px"}}>{tr("appNatalChartTitle")}</h2>
        {!profile||!chart?<div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:32,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:12}}>🌌</div><h3 style={{color:C.white,fontSize:15,fontWeight:700,marginBottom:8}}>{tr("appNatalChartCardTitle")}</h3><p style={{color:C.muted,fontSize:13,marginBottom:20,lineHeight:1.6}}>{tr("appNatalChartCardDesc")}</p>
          <GoldBtn onClick={()=>setShowProfile(true)}>{tr("appCalculateChart")}</GoldBtn>
        </div>:<>
          <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:15,fontWeight:700,color:C.gold}}>{profile.name}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{profile.birthdate} · {profile.birthtime} · {profile.city}</div></div>
              <button onClick={()=>setShowProfile(true)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:10,padding:"5px 10px",color:C.muted,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{tr("appEdit")}</button>
            </div>
          </div>
          <CartaNatal chart={chart} transits={transits||{}} transitAspects={transitAspects} />
        </>}
      </div>}

      {/* AMOR */}
      {tab==="amor"&&<AmorView myChart={chart} myProfile={profile} loggedEmail={loggedEmail} />}

      {/* TAROT */}
      {tab==="tarot"&&<TarotView />}

      {/* SIGNOS */}
      {tab==="horoscopo"&&<MasView profile={profile} chart={chart} transits={transits} />}
    </main>

    {/* Nav */}
    <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"min(480px, 100vw)",background:C.bgMid,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:99}}>
      {NAV.map(item=>{const isActive=tab===item.id||(item.id==="mas"&&tab==="horoscopo");
        return <button key={item.id} onClick={()=>{if(item.id==="mas"){setTab("horoscopo");}else{setTab(item.id);}}} style={{flex:1,border:"none",background:"none",padding:"8px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontFamily:"inherit"}}>
          <span style={{fontSize:18,filter:isActive?"none":"grayscale(0.5) opacity(0.5)"}}>{item.icon}</span>
          <span style={{fontSize:9,fontWeight:700,color:isActive?C.gold:C.mutedDark}}>{item.label}</span>
          {isActive&&<div style={{width:14,height:2,borderRadius:1,background:C.gold}} />}
        </button>;
      })}
    </nav>
  </div>;
}

// ── BASE DE DATOS COMPLETA DE SIGNOS ─────────────────────
const SIGN_INFO = {
  Aries: {
    dates: "21 Mar – 19 Abr", element: "Fuego", elementEmoji: "🔥",
    ruler: "Marte", rulerWhy: "el planeta de la acción, la energía y la valentía",
    color: "Rojo", colorHex: "#e04060", polarity: "Masculino / Activo",
    modality: "Cardinal (inicia)", bodyPart: "Cabeza",
    keyword: "\"Yo soy\"",
    traits: ["Valiente y directo", "Le encanta empezar cosas nuevas", "Impaciente pero honesto", "Líder natural", "Competitivo"],
    strengths: "Coraje, iniciativa, honestidad, energía para empezar lo que otros no se atreven.",
    challenges: "Puede ser impulsivo, impaciente o egoísta cuando no consigue lo que quiere rápido.",
    loveStyle: "Ama con intensidad y rapidez. Necesita pareja que le siga el ritmo y no le aburra.",
    compatible: ["Leo", "Sagitario", "Géminis", "Acuario"],
  },
  Tauro: {
    dates: "20 Abr – 20 May", element: "Tierra", elementEmoji: "🌍",
    ruler: "Venus", rulerWhy: "el planeta del amor, la belleza y el placer",
    color: "Verde / Rosa", colorHex: "#30d0b0", polarity: "Femenino / Receptivo",
    modality: "Fijo (sostiene)", bodyPart: "Cuello y garganta",
    keyword: "\"Yo tengo\"",
    traits: ["Estable y confiable", "Disfruta el placer y la comodidad", "Terco pero leal", "Paciente", "Sensorial"],
    strengths: "Lealtad, paciencia, gusto por lo bello, capacidad de construir cosas duraderas.",
    challenges: "Puede ser terco, resistente al cambio o posesivo en exceso.",
    loveStyle: "Ama despacio pero para siempre. Necesita estabilidad y gestos físicos de cariño.",
    compatible: ["Virgo", "Capricornio", "Cáncer", "Piscis"],
  },
  Géminis: {
    dates: "21 May – 20 Jun", element: "Aire", elementEmoji: "💨",
    ruler: "Mercurio", rulerWhy: "el planeta de la comunicación, la mente y el aprendizaje",
    color: "Amarillo", colorHex: "#f0c040", polarity: "Masculino / Activo",
    modality: "Mutable (se adapta)", bodyPart: "Brazos y pulmones",
    keyword: "\"Yo pienso\"",
    traits: ["Curioso y comunicativo", "Le encanta aprender de todo", "Sociable", "Cambia de opinión fácil", "Ingenioso"],
    strengths: "Inteligencia rápida, versatilidad, gran capacidad de comunicación y adaptación.",
    challenges: "Puede ser disperso, inconstante o decir cosas sin pensar.",
    loveStyle: "Necesita estimulación mental. Se enamora de la conversación tanto como de la persona.",
    compatible: ["Libra", "Acuario", "Aries", "Leo"],
  },
  Cáncer: {
    dates: "21 Jun – 22 Jul", element: "Agua", elementEmoji: "💧",
    ruler: "Luna", rulerWhy: "el astro de las emociones, la intuición y el hogar",
    color: "Plateado / Blanco", colorHex: "#9b6dff", polarity: "Femenino / Receptivo",
    modality: "Cardinal (inicia)", bodyPart: "Pecho y estómago",
    keyword: "\"Yo siento\"",
    traits: ["Protector y maternal", "Muy intuitivo", "Apegado a la familia", "Sensible", "Memoria emocional fuerte"],
    strengths: "Empatía profunda, lealtad, capacidad de cuidar y crear hogar para otros.",
    challenges: "Puede ser susceptible, retraído o cargar rencores del pasado.",
    loveStyle: "Ama con todo el corazón y necesita sentirse seguro emocionalmente antes de abrirse.",
    compatible: ["Escorpio", "Piscis", "Tauro", "Virgo"],
  },
  Leo: {
    dates: "23 Jul – 22 Ago", element: "Fuego", elementEmoji: "🔥",
    ruler: "Sol", rulerWhy: "el centro del sistema solar, símbolo de identidad y vitalidad",
    color: "Dorado / Naranja", colorHex: "#f0c040", polarity: "Masculino / Activo",
    modality: "Fijo (sostiene)", bodyPart: "Corazón y espalda",
    keyword: "\"Yo brillo\"",
    traits: ["Generoso y carismático", "Le gusta ser el centro de atención", "Orgulloso", "Creativo", "Leal con los suyos"],
    strengths: "Carisma natural, generosidad, calidez, capacidad de inspirar a otros.",
    challenges: "Puede ser orgulloso, dramático o necesitar demasiada validación externa.",
    loveStyle: "Ama de forma intensa y generosa. Necesita admiración y reconocimiento de su pareja.",
    compatible: ["Aries", "Sagitario", "Géminis", "Libra"],
  },
  Virgo: {
    dates: "23 Ago – 22 Sep", element: "Tierra", elementEmoji: "🌍",
    ruler: "Mercurio", rulerWhy: "el planeta del análisis, el detalle y el orden mental",
    color: "Verde oliva / Café", colorHex: "#30d0b0", polarity: "Femenino / Receptivo",
    modality: "Mutable (se adapta)", bodyPart: "Sistema digestivo",
    keyword: "\"Yo analizo\"",
    traits: ["Perfeccionista y servicial", "Muy organizado", "Observador", "Práctico", "Crítico (consigo mismo también)"],
    strengths: "Atención al detalle, capacidad de mejorar cualquier cosa, lealtad silenciosa.",
    challenges: "Puede ser autoexigente en exceso, criticón o ansioso por el control.",
    loveStyle: "Demuestra amor con actos de servicio. Necesita sentirse útil y apreciado en lo pequeño.",
    compatible: ["Tauro", "Capricornio", "Cáncer", "Escorpio"],
  },
  Libra: {
    dates: "23 Sep – 22 Oct", element: "Aire", elementEmoji: "💨",
    ruler: "Venus", rulerWhy: "el planeta de la armonía, las relaciones y la belleza",
    color: "Rosa pastel / Celeste", colorHex: "#e056a0", polarity: "Masculino / Activo",
    modality: "Cardinal (inicia)", bodyPart: "Riñones y piel",
    keyword: "\"Yo equilibro\"",
    traits: ["Diplomático y encantador", "Busca la armonía", "Indeciso", "Sociable", "Amante de la belleza y la justicia"],
    strengths: "Diplomacia, sentido de la justicia, encanto natural, habilidad para mediar conflictos.",
    challenges: "Puede ser indeciso, dependiente de la aprobación ajena o evitar conflictos necesarios.",
    loveStyle: "Necesita pareja para sentirse completo. Ama con elegancia y busca equilibrio constante.",
    compatible: ["Géminis", "Acuario", "Leo", "Sagitario"],
  },
  Escorpio: {
    dates: "23 Oct – 21 Nov", element: "Agua", elementEmoji: "💧",
    ruler: "Plutón (y Marte)", rulerWhy: "el planeta de la transformación profunda y el poder oculto",
    color: "Rojo oscuro / Negro", colorHex: "#e04060", polarity: "Femenino / Receptivo",
    modality: "Fijo (sostiene)", bodyPart: "Órganos reproductivos",
    keyword: "\"Yo transformo\"",
    traits: ["Intenso y misterioso", "Muy leal", "Apasionado", "Perceptivo", "No olvida traiciones"],
    strengths: "Profundidad emocional, lealtad extrema, capacidad de regenerarse de cualquier crisis.",
    challenges: "Puede ser celoso, controlador o guardar resentimientos por mucho tiempo.",
    loveStyle: "Ama con una intensidad total — todo o nada. Necesita confianza absoluta y conexión profunda.",
    compatible: ["Cáncer", "Piscis", "Virgo", "Capricornio"],
  },
  Sagitario: {
    dates: "22 Nov – 21 Dic", element: "Fuego", elementEmoji: "🔥",
    ruler: "Júpiter", rulerWhy: "el planeta de la expansión, la suerte y la filosofía de vida",
    color: "Púrpura / Azul", colorHex: "#9b6dff", polarity: "Masculino / Activo",
    modality: "Mutable (se adapta)", bodyPart: "Caderas y muslos",
    keyword: "\"Yo exploro\"",
    traits: ["Aventurero y optimista", "Ama la libertad", "Filosófico", "Honesto sin filtro", "Inquieto"],
    strengths: "Optimismo contagioso, mente abierta, amor por aprender y explorar el mundo.",
    challenges: "Puede ser irresponsable, prometer de más o evitar compromisos por miedo a perder libertad.",
    loveStyle: "Necesita espacio y aventura. Ama a quien lo deja ser libre sin dejar de ser su compañero.",
    compatible: ["Aries", "Leo", "Libra", "Acuario"],
  },
  Capricornio: {
    dates: "22 Dic – 19 Ene", element: "Tierra", elementEmoji: "🌍",
    ruler: "Saturno", rulerWhy: "el planeta de la disciplina, la estructura y la responsabilidad",
    color: "Gris / Negro", colorHex: "#9080b0", polarity: "Femenino / Receptivo",
    modality: "Cardinal (inicia)", bodyPart: "Huesos y rodillas",
    keyword: "\"Yo construyo\"",
    traits: ["Disciplinado y ambicioso", "Trabajador incansable", "Reservado", "Responsable", "Madura rápido"],
    strengths: "Determinación, paciencia a largo plazo, capacidad de lograr metas grandes con esfuerzo sostenido.",
    challenges: "Puede ser frío en apariencia, workaholic o demasiado duro consigo mismo.",
    loveStyle: "Ama de forma seria y comprometida. Tarda en abrirse pero cuando lo hace, es para siempre.",
    compatible: ["Tauro", "Virgo", "Escorpio", "Piscis"],
  },
  Acuario: {
    dates: "20 Ene – 18 Feb", element: "Aire", elementEmoji: "💨",
    ruler: "Urano (y Saturno)", rulerWhy: "el planeta de la innovación, la rebeldía y el cambio repentino",
    color: "Azul eléctrico / Turquesa", colorHex: "#40c8f0", polarity: "Masculino / Activo",
    modality: "Fijo (sostiene)", bodyPart: "Tobillos y circulación",
    keyword: "\"Yo innovo\"",
    traits: ["Original e independiente", "Visionario", "Humanitario", "Desapegado emocionalmente a veces", "Rebelde"],
    strengths: "Originalidad, pensamiento innovador, compromiso genuino con causas colectivas.",
    challenges: "Puede ser distante emocionalmente, terco con sus ideas o impredecible.",
    loveStyle: "Ama desde la amistad y la mente. Necesita espacio y libertad incluso dentro de la pareja.",
    compatible: ["Géminis", "Libra", "Aries", "Sagitario"],
  },
  Piscis: {
    dates: "19 Feb – 20 Mar", element: "Agua", elementEmoji: "💧",
    ruler: "Neptuno (y Júpiter)", rulerWhy: "el planeta de los sueños, la espiritualidad y la imaginación",
    color: "Verde mar / Lila", colorHex: "#9b6dff", polarity: "Femenino / Receptivo",
    modality: "Mutable (se adapta)", bodyPart: "Pies",
    keyword: "\"Yo creo\"",
    traits: ["Soñador y compasivo", "Muy intuitivo", "Artístico", "Empático al extremo", "A veces evasivo"],
    strengths: "Empatía profunda, creatividad, conexión espiritual, capacidad de sanar a otros.",
    challenges: "Puede perderse en la fantasía, ser demasiado complaciente o absorber el dolor ajeno.",
    loveStyle: "Ama de forma incondicional y romántica. Necesita pareja que entienda su mundo sensible.",
    compatible: ["Cáncer", "Escorpio", "Tauro", "Capricornio"],
  },
};

// rulerKey keeps the Spanish planet name (first word) so PLANET_SYMBOLS[...] lookups keep working;
// rulerDisplay is what's actually shown to English-reading users.
const SIGN_INFO_EN = {
  Aries: {
    dates: "Mar 21 – Apr 19", element: "Fire", elementEmoji: "🔥",
    ruler: "Marte", rulerDisplay: "Mars", rulerWhy: "the planet of action, energy, and courage",
    color: "Red", colorHex: "#e04060", polarity: "Masculine / Active",
    modality: "Cardinal (initiates)", bodyPart: "Head",
    keyword: "\"I am\"",
    traits: ["Brave and direct", "Loves starting new things", "Impatient but honest", "Natural-born leader", "Competitive"],
    strengths: "Courage, initiative, honesty, the energy to start what others don't dare to.",
    challenges: "Can be impulsive, impatient, or selfish when things don't move fast enough.",
    loveStyle: "Loves intensely and fast. Needs a partner who can keep up and won't bore them.",
    compatible: ["Leo", "Sagitario", "Géminis", "Acuario"],
  },
  Tauro: {
    dates: "Apr 20 – May 20", element: "Earth", elementEmoji: "🌍",
    ruler: "Venus", rulerDisplay: "Venus", rulerWhy: "the planet of love, beauty, and pleasure",
    color: "Green / Pink", colorHex: "#30d0b0", polarity: "Feminine / Receptive",
    modality: "Fixed (sustains)", bodyPart: "Neck and throat",
    keyword: "\"I have\"",
    traits: ["Stable and reliable", "Enjoys pleasure and comfort", "Stubborn but loyal", "Patient", "Sensory"],
    strengths: "Loyalty, patience, an appreciation for beauty, the ability to build things that last.",
    challenges: "Can be stubborn, resistant to change, or overly possessive.",
    loveStyle: "Loves slowly but forever. Needs stability and physical gestures of affection.",
    compatible: ["Virgo", "Capricornio", "Cáncer", "Piscis"],
  },
  Géminis: {
    dates: "May 21 – Jun 20", element: "Air", elementEmoji: "💨",
    ruler: "Mercurio", rulerDisplay: "Mercury", rulerWhy: "the planet of communication, the mind, and learning",
    color: "Yellow", colorHex: "#f0c040", polarity: "Masculine / Active",
    modality: "Mutable (adapts)", bodyPart: "Arms and lungs",
    keyword: "\"I think\"",
    traits: ["Curious and chatty", "Loves learning about everything", "Sociable", "Changes their mind easily", "Witty"],
    strengths: "Quick intelligence, versatility, great communication skills, and adaptability.",
    challenges: "Can be scattered, inconsistent, or speak before thinking things through.",
    loveStyle: "Needs mental stimulation. Falls for the conversation as much as for the person.",
    compatible: ["Libra", "Acuario", "Aries", "Leo"],
  },
  Cáncer: {
    dates: "Jun 21 – Jul 22", element: "Water", elementEmoji: "💧",
    ruler: "Luna", rulerDisplay: "the Moon", rulerWhy: "the celestial body of emotions, intuition, and home",
    color: "Silver / White", colorHex: "#9b6dff", polarity: "Feminine / Receptive",
    modality: "Cardinal (initiates)", bodyPart: "Chest and stomach",
    keyword: "\"I feel\"",
    traits: ["Protective and nurturing", "Highly intuitive", "Attached to family", "Sensitive", "Strong emotional memory"],
    strengths: "Deep empathy, loyalty, the ability to care for others and create a sense of home.",
    challenges: "Can be touchy, withdrawn, or hold onto old grudges.",
    loveStyle: "Loves with their whole heart and needs to feel emotionally safe before opening up.",
    compatible: ["Escorpio", "Piscis", "Tauro", "Virgo"],
  },
  Leo: {
    dates: "Jul 23 – Aug 22", element: "Fire", elementEmoji: "🔥",
    ruler: "Sol", rulerDisplay: "the Sun", rulerWhy: "the center of the solar system, a symbol of identity and vitality",
    color: "Gold / Orange", colorHex: "#f0c040", polarity: "Masculine / Active",
    modality: "Fixed (sustains)", bodyPart: "Heart and back",
    keyword: "\"I shine\"",
    traits: ["Generous and charismatic", "Likes being the center of attention", "Proud", "Creative", "Fiercely loyal to their own"],
    strengths: "Natural charisma, generosity, warmth, the ability to inspire others.",
    challenges: "Can be prideful, dramatic, or need too much outside validation.",
    loveStyle: "Loves intensely and generously. Needs admiration and recognition from their partner.",
    compatible: ["Aries", "Sagitario", "Géminis", "Libra"],
  },
  Virgo: {
    dates: "Aug 23 – Sep 22", element: "Earth", elementEmoji: "🌍",
    ruler: "Mercurio", rulerDisplay: "Mercury", rulerWhy: "the planet of analysis, detail, and mental order",
    color: "Olive green / Brown", colorHex: "#30d0b0", polarity: "Feminine / Receptive",
    modality: "Mutable (adapts)", bodyPart: "Digestive system",
    keyword: "\"I analyze\"",
    traits: ["Perfectionist and helpful", "Highly organized", "Observant", "Practical", "Critical (of themselves too)"],
    strengths: "Attention to detail, the ability to improve anything, quiet loyalty.",
    challenges: "Can be overly self-demanding, critical, or anxious about control.",
    loveStyle: "Shows love through acts of service. Needs to feel useful and appreciated in small ways.",
    compatible: ["Tauro", "Capricornio", "Cáncer", "Escorpio"],
  },
  Libra: {
    dates: "Sep 23 – Oct 22", element: "Air", elementEmoji: "💨",
    ruler: "Venus", rulerDisplay: "Venus", rulerWhy: "the planet of harmony, relationships, and beauty",
    color: "Pastel pink / Sky blue", colorHex: "#e056a0", polarity: "Masculine / Active",
    modality: "Cardinal (initiates)", bodyPart: "Kidneys and skin",
    keyword: "\"I balance\"",
    traits: ["Diplomatic and charming", "Seeks harmony", "Indecisive", "Sociable", "Lover of beauty and fairness"],
    strengths: "Diplomacy, a strong sense of justice, natural charm, the ability to mediate conflict.",
    challenges: "Can be indecisive, dependent on others' approval, or avoid necessary conflict.",
    loveStyle: "Needs a partner to feel complete. Loves with elegance and constantly seeks balance.",
    compatible: ["Géminis", "Acuario", "Leo", "Sagitario"],
  },
  Escorpio: {
    dates: "Oct 23 – Nov 21", element: "Water", elementEmoji: "💧",
    ruler: "Plutón (y Marte)", rulerDisplay: "Pluto (and Mars)", rulerWhy: "the planet of deep transformation and hidden power",
    color: "Dark red / Black", colorHex: "#e04060", polarity: "Feminine / Receptive",
    modality: "Fixed (sustains)", bodyPart: "Reproductive organs",
    keyword: "\"I transform\"",
    traits: ["Intense and mysterious", "Deeply loyal", "Passionate", "Perceptive", "Doesn't forget betrayals"],
    strengths: "Emotional depth, extreme loyalty, the ability to regenerate after any crisis.",
    challenges: "Can be jealous, controlling, or hold onto resentment for a long time.",
    loveStyle: "Loves with total intensity — all or nothing. Needs absolute trust and deep connection.",
    compatible: ["Cáncer", "Piscis", "Virgo", "Capricornio"],
  },
  Sagitario: {
    dates: "Nov 22 – Dec 21", element: "Fire", elementEmoji: "🔥",
    ruler: "Júpiter", rulerDisplay: "Jupiter", rulerWhy: "the planet of expansion, luck, and life philosophy",
    color: "Purple / Blue", colorHex: "#9b6dff", polarity: "Masculine / Active",
    modality: "Mutable (adapts)", bodyPart: "Hips and thighs",
    keyword: "\"I explore\"",
    traits: ["Adventurous and optimistic", "Loves freedom", "Philosophical", "Bluntly honest", "Restless"],
    strengths: "Contagious optimism, an open mind, a love of learning and exploring the world.",
    challenges: "Can be irresponsible, overpromise, or avoid commitment out of fear of losing freedom.",
    loveStyle: "Needs space and adventure. Loves whoever lets them be free while still being their companion.",
    compatible: ["Aries", "Leo", "Libra", "Acuario"],
  },
  Capricornio: {
    dates: "Dec 22 – Jan 19", element: "Earth", elementEmoji: "🌍",
    ruler: "Saturno", rulerDisplay: "Saturn", rulerWhy: "the planet of discipline, structure, and responsibility",
    color: "Gray / Black", colorHex: "#9080b0", polarity: "Feminine / Receptive",
    modality: "Cardinal (initiates)", bodyPart: "Bones and knees",
    keyword: "\"I build\"",
    traits: ["Disciplined and ambitious", "Tireless worker", "Reserved", "Responsible", "Matures quickly"],
    strengths: "Determination, long-term patience, the ability to achieve big goals through sustained effort.",
    challenges: "Can come across as cold, become a workaholic, or be too hard on themselves.",
    loveStyle: "Loves seriously and with commitment. Takes time to open up, but when they do, it's for good.",
    compatible: ["Tauro", "Virgo", "Escorpio", "Piscis"],
  },
  Acuario: {
    dates: "Jan 20 – Feb 18", element: "Air", elementEmoji: "💨",
    ruler: "Urano (y Saturno)", rulerDisplay: "Uranus (and Saturn)", rulerWhy: "the planet of innovation, rebellion, and sudden change",
    color: "Electric blue / Turquoise", colorHex: "#40c8f0", polarity: "Masculine / Active",
    modality: "Fixed (sustains)", bodyPart: "Ankles and circulation",
    keyword: "\"I innovate\"",
    traits: ["Original and independent", "Visionary", "Humanitarian", "Sometimes emotionally detached", "Rebellious"],
    strengths: "Originality, innovative thinking, genuine commitment to collective causes.",
    challenges: "Can be emotionally distant, stubborn about their ideas, or unpredictable.",
    loveStyle: "Loves through friendship and the mind. Needs space and freedom even within a relationship.",
    compatible: ["Géminis", "Libra", "Aries", "Sagitario"],
  },
  Piscis: {
    dates: "Feb 19 – Mar 20", element: "Water", elementEmoji: "💧",
    ruler: "Neptuno (y Júpiter)", rulerDisplay: "Neptune (and Jupiter)", rulerWhy: "the planet of dreams, spirituality, and imagination",
    color: "Sea green / Lilac", colorHex: "#9b6dff", polarity: "Feminine / Receptive",
    modality: "Mutable (adapts)", bodyPart: "Feet",
    keyword: "\"I believe\"",
    traits: ["Dreamy and compassionate", "Highly intuitive", "Artistic", "Extremely empathetic", "Sometimes evasive"],
    strengths: "Deep empathy, creativity, spiritual connection, the ability to heal others.",
    challenges: "Can get lost in fantasy, be overly accommodating, or absorb other people's pain.",
    loveStyle: "Loves unconditionally and romantically. Needs a partner who understands their sensitive inner world.",
    compatible: ["Cáncer", "Escorpio", "Tauro", "Capricornio"],
  },
};

function SignDetailView({ signName, onBack }) {
  const { t, language } = useLanguage();
  const isEn = language === "en";
  const info = (isEn ? SIGN_INFO_EN : SIGN_INFO)[signName];
  const rulerDisplay = isEn ? (info.rulerDisplay || info.ruler) : info.ruler;
  const sign = SIGNS_LIST.find(s => s.name === signName);
  return (
    <div style={{padding:16}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.violet,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit",marginBottom:14}}>{t("signDetailBack")}</button>

      <div style={{textAlign:"center",marginBottom:18}}>
        <div style={{fontSize:56,marginBottom:6}}>{sign.glyph}</div>
        <div style={{fontSize:22,fontWeight:800,color:sign.color}}>{signLabel(signName,language)}</div>
        <div style={{fontSize:12,color:C.muted,marginTop:2}}>{info.dates}</div>
        <div style={{fontSize:13,color:C.gold,fontStyle:"italic",marginTop:6}}>{info.keyword}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:14}}>
        <Card style={{padding:12,textAlign:"center"}}><div style={{fontSize:20,marginBottom:4}}>{info.elementEmoji}</div><div style={{fontSize:10,color:C.muted}}>{t("signDetailElement")}</div><div style={{fontSize:13,fontWeight:700,color:C.white}}>{info.element}</div></Card>
        <Card style={{padding:12,textAlign:"center"}}><div style={{fontSize:20,marginBottom:4}}>{PLANET_SYMBOLS[info.ruler.split(" ")[0]]||"🪐"}</div><div style={{fontSize:10,color:C.muted}}>{t("signDetailRulerPlanet")}</div><div style={{fontSize:13,fontWeight:700,color:C.white}}>{rulerDisplay}</div></Card>
        <Card style={{padding:12,textAlign:"center"}}><div style={{width:20,height:20,borderRadius:"50%",background:info.colorHex,margin:"0 auto 4px"}} /><div style={{fontSize:10,color:C.muted}}>{t("signDetailColor")}</div><div style={{fontSize:13,fontWeight:700,color:C.white}}>{info.color}</div></Card>
        <Card style={{padding:12,textAlign:"center"}}><div style={{fontSize:20,marginBottom:4}}>⚖️</div><div style={{fontSize:10,color:C.muted}}>{t("signDetailModality")}</div><div style={{fontSize:12,fontWeight:700,color:C.white}}>{info.modality}</div></Card>
      </div>

      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:8}}>{t("signDetailWhyTitle",{ruler:rulerDisplay.toUpperCase()})}</div>
        <p style={{fontSize:13,color:C.white,lineHeight:1.6,margin:0}}>{t("signDetailWhyBody",{sign:signLabel(signName,language),ruler:rulerDisplay,rulerWhy:info.rulerWhy})}</p>
      </Card>

      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:C.teal,fontWeight:700,marginBottom:8}}>{t("signDetailTraitsTitle")}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {info.traits.map((tr,i)=><Pill key={i} color={sign.color} style={{fontSize:11}}>{tr}</Pill>)}
        </div>
      </Card>

      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:C.success,fontWeight:700,marginBottom:6}}>{t("signDetailStrengths")}</div>
        <p style={{fontSize:13,color:C.white,lineHeight:1.6,margin:"0 0 14px"}}>{info.strengths}</p>
        <div style={{fontSize:11,color:C.warn,fontWeight:700,marginBottom:6}}>{t("signDetailChallenges")}</div>
        <p style={{fontSize:13,color:C.white,lineHeight:1.6,margin:0}}>{info.challenges}</p>
      </Card>

      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:C.pink,fontWeight:700,marginBottom:6}}>{t("signDetailLoveStyle",{sign:signLabel(signName,language).toUpperCase()})}</div>
        <p style={{fontSize:13,color:C.white,lineHeight:1.6,margin:0}}>{info.loveStyle}</p>
      </Card>

      <Card>
        <div style={{fontSize:11,color:C.violet,fontWeight:700,marginBottom:8}}>{t("signDetailCompatible")}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {info.compatible.map(s=>{
            const cs = SIGNS_LIST.find(x=>x.name===s);
            return <div key={s} style={{display:"flex",alignItems:"center",gap:4,background:`${cs?.color}18`,border:`1px solid ${cs?.color}33`,borderRadius:20,padding:"4px 10px"}}><span>{cs?.glyph}</span><span style={{fontSize:11,color:C.white,fontWeight:600}}>{signLabel(s,language)}</span></div>;
          })}
        </div>
      </Card>
    </div>
  );
}

function SignosListView() {
  const { t, language } = useLanguage();
  const isEn = language === "en";
  const TABLE = isEn ? SIGN_INFO_EN : SIGN_INFO;
  const [selected, setSelected] = useState(null);
  if (selected) return <SignDetailView signName={selected} onBack={()=>setSelected(null)} />;
  return (
    <div style={{padding:"0 16px"}}>
      <p style={{color:C.muted,fontSize:12,marginBottom:14,lineHeight:1.5}}>{t("signosListHint")}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:8}}>
        {SIGNS_LIST.map((sign)=>{
          const info = TABLE[sign.name];
          const rulerDisplay = isEn ? (info.rulerDisplay || info.ruler) : info.ruler;
          return <div key={sign.name} onClick={()=>setSelected(sign.name)}
            style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:14,cursor:"pointer"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=sign.color} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:28}}>{sign.glyph}</span><div><div style={{fontSize:14,fontWeight:700,color:sign.color}}>{signLabel(sign.name,language)}</div><div style={{fontSize:10,color:C.muted}}>{info.dates}</div></div></div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}><Pill color={sign.color} style={{fontSize:9}}>{info.elementEmoji} {info.element}</Pill><Pill color={C.muted} style={{fontSize:9}}>{rulerDisplay.split(" ")[0]}</Pill></div>
            <div style={{fontSize:10,color:C.muted,fontStyle:"italic"}}>{info.keyword}</div>
          </div>;
        })}
      </div>
    </div>
  );
}

// ── MÁS — Luna, eventos, energía, signos ─────────────────
function MasView({ profile, chart, transits }) {
  const { t, language } = useLanguage();
  const [sub, setSub] = useState("luna");
  const SUBS = [
    { id:"luna", label:t("masSubLuna") },
    { id:"eventos", label:t("masSubEventos") },
    { id:"planetas", label:t("masSubPlanetas") },
    { id:"signos", label:t("masSubSignos") },
  ];
  return (
    <div>
      <div style={{padding:"16px 16px 0", display:"flex", gap:6, overflowX:"auto"}}>
        {SUBS.map(s => (
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{background:sub===s.id?`${C.gold}22`:"transparent",border:`1px solid ${sub===s.id?C.goldDim:C.border}`,borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:600,color:sub===s.id?C.gold:C.muted,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>
            {s.label}
          </button>
        ))}
      </div>
      <div style={{padding:"16px 0"}}>
        {sub==="luna" && <>
          <MoonCalendar />
          <LunarTips />
        </>}
        {sub==="eventos" && <AstroEvents />}
        {sub==="planetas" && transits && (
          <div style={{margin:"0 16px 14px",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:16}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:12}}>{t("masPlanetPositionsTitle")}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
              {Object.entries(transits).map(([name,lon])=>(
                <div key={name} style={{display:"flex",gap:8,alignItems:"center",background:C.bgDeep,borderRadius:10,padding:"8px 10px"}}>
                  <span style={{fontSize:16}}>{PLANET_SYMBOLS[name]}</span>
                  <div><div style={{fontSize:11,fontWeight:700,color:C.white}}>{name}</div><div style={{fontSize:10,color:C.muted}}>{signLabel(signOf(lon),language)} {degInSign(lon)}°</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {sub==="signos" && <SignosListView />}
      </div>
    </div>
  );
}

// ── MAIN APP WRAPPER CON ACCESO ──────────────────────────
export default function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem("cosmicall_lang");
      return saved === "en" || saved === "es" ? saved : "es";
    } catch {
      return "es";
    }
  });

  function setLanguage(next) {
    setLanguageState(next);
    try { localStorage.setItem("cosmicall_lang", next); } catch {}
  }

  function handleLogin(email, admin) {
    setUserEmail(email);
    setIsAdmin(admin);
  }

  function handleLogout() {
    setUserEmail(null);
    setIsAdmin(false);
    setShowAdmin(false);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {!userEmail ? (
        <LoginGate onLogin={handleLogin} />
      ) : (
        <>
          <CosmicallApp
            loggedEmail={userEmail}
            isAdmin={isAdmin}
            onOpenAdmin={() => setShowAdmin(true)}
            onLogout={handleLogout}
          />
          {showAdmin && isAdmin && (
            <AdminPanel onClose={() => setShowAdmin(false)} />
          )}
        </>
      )}
    </LanguageContext.Provider>
  );
}
