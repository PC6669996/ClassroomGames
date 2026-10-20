/* =========================================
   CONFIGURACIÓN INICIAL
========================================= */


/*
    CONTRASEÑA QUE SE USARÁ LA PRIMERA VEZ.

    Cámbiala editando DEFAULT_PASSWORD más abajo.
*/

// Edita estas dos constantes para configurar los accesos.
const DEFAULT_PASSWORD = "2627"; // Abre el menú de juegos.
const DEFAULT_CLASSROOM_PASSWORD = "2726"; // Abre Google Classroom directamente.
const LOCK_VIDEO_PATH = "lock-animation.mp4";
const LOCK_KEY = "classroomGamesLocked";
const FAILED_ATTEMPTS_KEY = "classroomGamesFailedAttempts";

// Se registra primero para que siga activo en la pantalla de bloqueo.
window.addEventListener("keydown", function(event) {
    const keyIsU = event.key.toLowerCase() === "u" || event.code === "KeyU";
    const modifier = event.ctrlKey || event.metaKey;
    if (keyIsU && modifier && event.shiftKey) {
        event.preventDefault();
        event.stopImmediatePropagation();
        localStorage.removeItem(LOCK_KEY);
        localStorage.removeItem(FAILED_ATTEMPTS_KEY);
        window.location.reload();
    }
}, true);


/*
    NOMBRE INICIAL DE LA APLICACIÓN.

    Después podrás cambiarlo desde
    Configuración → Cambiar nombre.
*/

const DEFAULT_APP_NAME = "Classroom";


/* =========================================
   WEBS
========================================= */


/*
    AÑADE AQUÍ TUS PÁGINAS.

    Puedes poner tantas como quieras.

    nombre = nombre que aparecerá
    icono  = emoji de la tarjeta
    url    = dirección de la página
*/

const WEBS = [

    {
        nombre: "Caca de mierda de web de juegos",
        icono: "🎮",
        url: "https://www.misjuegos.com/"
    },

    {
        nombre: "Bgames",
        icono: "🕹️",
        url: "https://www.bgames.com/"
    },

    {
        nombre: "Onlinegames",
        icono: "🎮",
        url: "https://www.onlinegames.io/"
    },

    {
        nombre: "Calcsolver",
        icono: "🕹️",
        url: "https://calcsolver.net/"
    },
   
   {
        nombre: "Calcsolver 2",
        icono: "🕹️",
        url: "https://mathkit.online/"
    },
   
   {
        nombre: "Unblocked Games",
        icono: "🕹️",
        url: "https://glacierarcade.win/apps"
    }




];


/* =========================================
   ELEMENTOS
========================================= */

const loginScreen =
    document.getElementById("loginScreen");

const appScreen =
    document.getElementById("appScreen");

const loginForm =
    document.getElementById("loginForm");

const passwordInput =
    document.getElementById("passwordInput");

const errorMessage =
    document.getElementById("errorMessage");

const loginAppName =
    document.getElementById("loginAppName");

const headerName =
    document.getElementById("headerName");

const webGrid =
    document.getElementById("webGrid");

const homeScreen =
    document.getElementById("homeScreen");

const browserScreen =
    document.getElementById("browserScreen");

const settingsScreen =
    document.getElementById("settingsScreen");

const nameScreen =
    document.getElementById("nameScreen");

const webSettingsScreen =
    document.getElementById("webSettingsScreen");

const websiteFrame =
    document.getElementById("websiteFrame");

const currentWebName =
    document.getElementById("currentWebName");

const lockButton =
    document.getElementById("lockButton");

const settingsButton =
    document.getElementById("settingsButton");

const backButton =
    document.getElementById("backButton");

const settingsBackButton =
    document.getElementById("settingsBackButton");

const manageWebsButton =
    document.getElementById("manageWebsButton");

const webSettingsBackButton =
    document.getElementById(
        "webSettingsBackButton"
    );

const changeNameButton =
    document.getElementById("changeNameButton");

const nameInput =
    document.getElementById("nameInput");

const saveNameButton =
    document.getElementById("saveNameButton");

const nameBackButton =
    document.getElementById("nameBackButton");

const nameMessage =
    document.getElementById("nameMessage");



/* =========================================
   NOMBRE DE LA APP
========================================= */

function getAppName() {

    return localStorage.getItem(
        "appName"
    ) || DEFAULT_APP_NAME;

}


function updateAppName() {

    const name = getAppName();

    document.title = name;

    loginAppName.textContent = name;

    headerName.textContent = name;

}


updateAppName();


/* =========================================
   CONTRASEÑA
========================================= */

function getPassword() {
    return DEFAULT_PASSWORD;
}

function getClassroomPassword() {
    return DEFAULT_CLASSROOM_PASSWORD;
}


/* =========================================
   OCULTAR TODAS LAS PANTALLAS
========================================= */

function hideAllScreens() {

    homeScreen.classList.add("hidden");

    browserScreen.classList.add("hidden");

    settingsScreen.classList.add("hidden");

    nameScreen.classList.add("hidden");

    webSettingsScreen.classList.add("hidden");

}


/* =========================================
   MENÚ PRINCIPAL
========================================= */

function showHome() {

    hideAllScreens();

    homeScreen.classList.remove(
        "hidden"
    );

}


/* =========================================
   CREAR TARJETAS DE WEBS
========================================= */

function createWebMenu() {

    webGrid.innerHTML = "";


    WEBS.forEach(
        function(web, index) {

            const card =
                document.createElement("div");

            card.className =
                "web-card";


            card.innerHTML = `

                <div class="web-icon">
                    ${web.icono}
                </div>

                <div class="web-name">
                    ${web.nombre}
                </div>

                <button
                    class="open-web"
                    data-index="${index}"
                >
                    ABRIR
                </button>

            `;


            webGrid.appendChild(card);

        }
    );


    document
        .querySelectorAll(".open-web")
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const index =
                            Number(
                                button.dataset.index
                            );

                        openWeb(index);

                    }
                );

            }
        );

}


/* =========================================
   ABRIR WEB
========================================= */

function openWeb(index) {

    const web = WEBS[index];

    if (!web) return;


    currentWebName.textContent =
        web.nombre;


    websiteFrame.src =
        web.url;


    hideAllScreens();


    browserScreen.classList.remove(
        "hidden"
    );

}


/* =========================================
   VOLVER AL MENÚ
========================================= */

function goHome() {

    websiteFrame.src =
        "about:blank";

    showHome();

}


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const enteredPassword =
            passwordInput.value;


        if (localStorage.getItem(LOCK_KEY) === "blocked") {
            showCriticalLock();
            return;
        }

        if (
            enteredPassword ===
            getPassword()
        ) {

            localStorage.removeItem(FAILED_ATTEMPTS_KEY);

            errorMessage.textContent =
                "";

            passwordInput.value =
                "";


            loginScreen.classList.add(
                "hidden"
            );


            appScreen.classList.remove(
                "hidden"
            );


            createWebMenu();

            showHome();


        } else if (
            enteredPassword ===
            getClassroomPassword()
        ) {

            localStorage.removeItem(FAILED_ATTEMPTS_KEY);

            errorMessage.textContent = "";
            passwordInput.value = "";
            loginScreen.classList.add("hidden");
            appScreen.classList.remove("hidden");
            openWebUrl("Google Classroom", "https://classroom.google.com/");


        } else {

            const attempts = Number(localStorage.getItem(FAILED_ATTEMPTS_KEY) || 0) + 1;
            localStorage.setItem(FAILED_ATTEMPTS_KEY, String(attempts));

            if (attempts >= 3) {
                localStorage.setItem(LOCK_KEY, "blocked");
                showCriticalLock();
                return;
            }

            errorMessage.textContent =
                `Contraseña incorrecta. Intentos: ${attempts}/3.`;

            passwordInput.select();

        }

    }
);

function showCriticalLock() {
    document.body.innerHTML = `<main class="critical-lock">
        <video id="lockAnimation" class="lock-animation" src="${LOCK_VIDEO_PATH}" autoplay muted playsinline aria-label="Animación de bloqueo"></video>
        <section id="lockNotice" class="lock-notice hidden">
            <h1>ERROR CRÍTICO</h1>
            <p>Aplicación bloqueada tras tres contraseñas incorrectas.</p>
            <p>La ejecución se ha detenido.</p>
        </section>
    </main>`;
    document.title = "ERROR CRÍTICO";

    const video = document.getElementById("lockAnimation");
    const lockNotice = document.getElementById("lockNotice");
    function revealLockNotice() {
        video.remove();
        lockNotice.classList.remove("hidden");
    }
    video.addEventListener("ended", revealLockNotice);
    video.addEventListener("error", revealLockNotice);
    video.play().catch(revealLockNotice);
}

function openWebUrl(name, url) {
    // Google bloquea su página principal dentro de iframes. Navegamos
    // directamente a Classroom para evitar el 404 / rechazo de inserción.
    window.location.assign(url);
}


/* =========================================
   BLOQUEAR
========================================= */

function lockApp() {

    websiteFrame.src =
        "about:blank";


    hideAllScreens();


    appScreen.classList.add(
        "hidden"
    );


    loginScreen.classList.remove(
        "hidden"
    );


    passwordInput.value =
        "";

    passwordInput.focus();

}


lockButton.addEventListener(
    "click",
    lockApp
);


/* =========================================
   CONFIGURACIÓN
========================================= */

settingsButton.addEventListener(
    "click",
    function() {

        hideAllScreens();

        settingsScreen.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   VOLVER DE CONFIGURACIÓN
========================================= */

settingsBackButton.addEventListener(
    "click",
    showHome
);


/* =========================================
   CAMBIAR NOMBRE
========================================= */

changeNameButton.addEventListener(
    "click",
    function() {

        hideAllScreens();


        nameInput.value =
            getAppName();


        nameMessage.textContent =
            "";


        nameScreen.classList.remove(
            "hidden"
        );


        nameInput.focus();

    }
);


/* =========================================
   GUARDAR NOMBRE
========================================= */

saveNameButton.addEventListener(
    "click",
    function() {

        const newName =
            nameInput.value.trim();


        if (
            newName.length < 1
        ) {

            nameMessage.textContent =
                "❌ Escribe un nombre.";

            return;

        }


        localStorage.setItem(
            "appName",
            newName
        );


        updateAppName();


        nameMessage.textContent =
            "✅ Nombre cambiado correctamente.";

    }
);


/* =========================================
   VOLVER DEL NOMBRE
========================================= */

nameBackButton.addEventListener(
    "click",
    function() {

        hideAllScreens();

        settingsScreen.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   GESTIONAR WEBS
========================================= */

manageWebsButton.addEventListener(
    "click",
    function() {

        hideAllScreens();

        webSettingsScreen.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   VOLVER DE WEBS
========================================= */

webSettingsBackButton.addEventListener(
    "click",
    function() {

        hideAllScreens();

        settingsScreen.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   VOLVER DEL VISOR
========================================= */

backButton.addEventListener(
    "click",
    goHome
);


/* =========================================
   ATAJO DE BLOQUEO
========================================= */


/*
    Windows / Chromebook:

        Ctrl + Shift + L


    Mac:

        Command + Shift + L
*/

document.addEventListener(
    "keydown",
    function(event) {

        const windowsOrChromebook =
            event.ctrlKey &&
            event.shiftKey;


        const mac =
            event.metaKey &&
            event.shiftKey;


        const correctKey =
            event.key.toLowerCase() === "l";

        if (
            correctKey &&
            (
                windowsOrChromebook ||
                mac
            )
        ) {

            event.preventDefault();

            lockApp();

        }

    }
);


/* =========================================
   SERVICE WORKER
========================================= */

if (localStorage.getItem(LOCK_KEY) === "blocked") showCriticalLock();


if ("serviceWorker" in navigator) {
    window.addEventListener("load", async function() {
        try {
            const registration =
                await navigator.serviceWorker.register("./sw.js");

            // Comprueba si hay una versión nueva al abrir la app.
            await registration.update();

            // Si se instala una nueva versión mientras la app
            // está abierta, recarga cuando el nuevo SW tome el control.
            let refreshing = false;

            navigator.serviceWorker.addEventListener(
                "controllerchange",
                function() {
                    if (refreshing) return;
                    refreshing = true;
                    window.location.reload();
                }
            );

        } catch (error) {
            console.error(
                "Error del Service Worker:",
                error
            );
        }
    });
}
