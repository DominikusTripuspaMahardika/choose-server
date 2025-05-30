document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".select-btn");

  // Spinner loading tampil di awal
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  // Setelah halaman siap sepenuhnya
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    spinner.style.display = "none";

    // Tampilkan toast secara berurutan
    showToast("Global Online", () => {
      showToast("Indonesia Online");
    });
  });

  // Event klik tombol
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const server = button.closest(".server-card").dataset.server;
      button.disabled = true;
      button.textContent = "Mengalihkan...";

      setTimeout(() => {
        if (server === "global") {
          window.location.href = "https://tinyurl.com/ViVienDoChannel-Global";
        } else if (server === "indonesia") {
          window.location.href =
            "https://tinyurl.com/ViVienDoChannel-Indonesia";
        }
      }, 5000);
    });
  });

  // Fungsi Toast
  function showToast(message, callback) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    const container = document.getElementById("toast-container");
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
      if (typeof callback === "function") callback();
    }, 3000); // Durasi toast + delay animasi
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const serverCards = document.querySelectorAll(".server-card");
  const today = new Date().toISOString().slice(0, 10); // format YYYY-MM-DD

  serverCards.forEach((card) => {
    const serverName = card.dataset.server;
    const userCountElem = card.querySelector(".user-count");

    // Ambil data dari localStorage
    const dataKey = `serverUserData_${serverName}`;
    let data = localStorage.getItem(dataKey);
    let userData;

    if (data) {
      try {
        userData = JSON.parse(data);
      } catch {
        userData = null;
      }
    }

    // Jika data tidak ada atau tanggal sudah berbeda, reset/tambah jumlah user
    if (!userData || userData.date !== today) {
      let newCount = userData ? userData.count : getRandomInt(50, 100); // kalau baru, mulai antara 50-100
      if (userData && userData.date !== today) {
        // Tambah user secara acak 1-20 setiap hari baru
        newCount += getRandomInt(1, 20);
      }
      userData = { date: today, count: newCount };
      localStorage.setItem(dataKey, JSON.stringify(userData));
    }

    // Tampilkan jumlah user
    userCountElem.textContent = userData.count;
  });
});

// Fungsi untuk angka acak antara min dan max (inklusif)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- MATRIX RAIN ---
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars =
  "アァイィウヴエエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -100; // posisi acak awal
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// --- HACKER TYPING ---
const hackerText = [
  "Accessing system...",
  "Initiating authentication process...",
  "Opening encrypted connection...",
  "Reading user data...",
  "Copying critical information...",
  "Decryption completed...",
  "Operation executed successfully...",
  "Secure session started...",
  "Bypassing firewall...",
  "Injecting shell script...",
  "Activating stealth mode...",
  "Connecting to anonymous proxy...",
  "Reading configuration files...",
  "Adding fake DNS entry...",
  "Uploading payload to target server...",
  "Monitoring network traffic...",
  "Connecting to dark network...",
  "Launching brute-force attack...",
  "Disabling security protocols...",
  "Accessing hidden port...",
  "Executing zero-day exploit...",
  "Extracting credentials...",
  "Wiping system logs...",
  "Resetting root password...",
  "Installing backdoor access...",
  "Running remote commands...",
  "Verifying administrator privileges...",
  "Modifying system appearance...",
  "Syncing with shadow server...",
  "Process complete: System fully compromised...",
];

const typedTextEl = document.getElementById("typedText");

function typeRandomLine() {
  const line = hackerText[Math.floor(Math.random() * hackerText.length)];
  let index = 0;

  function typeChar() {
    if (index < line.length) {
      typedTextEl.textContent += line.charAt(index);
      index++;
      setTimeout(typeChar, Math.random() * 50 + 25); // kecepatan acak
    } else {
      setTimeout(() => {
        typedTextEl.textContent = "";
        typeRandomLine();
      }, 1200);
    }
  }

  typeChar();
}

typeRandomLine();
