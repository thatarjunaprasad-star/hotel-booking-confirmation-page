const menuToggle = document.querySelector(".menu-toggle");
const menuBackdrop = document.querySelector(".menu-backdrop");
const menuLinks = document.querySelectorAll(".navigation-link");

function setMenuOpen(isOpen) {
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

menuBackdrop.addEventListener("click", () => setMenuOpen(false));
menuLinks.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

document.querySelector("[data-print]").addEventListener("click", () => window.print());

document.querySelector("[data-calendar]").addEventListener("click", () => {
  const eventDetails = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Maison Soleil//Booking//EN",
    "BEGIN:VEVENT",
    "UID:MS-2026-0421-AH@maisonsoliel.example",
    "DTSTAMP:20260101T000000Z",
    "DTSTART:20260425T150000",
    "DTEND:20260429T110000",
    "SUMMARY:Stay at Maison Soleil - La Garrigue",
    "LOCATION:12 Rue des Oliviers\\, Cassis",
    "DESCRIPTION:Booking MS-2026 0421-AH",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const calendarFile = new Blob([eventDetails], { type: "text/calendar;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(calendarFile);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = "maison-soleil-stay.ics";
  downloadLink.click();
  URL.revokeObjectURL(downloadUrl);
});

document.querySelector("[data-copy]").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const password = document.querySelector(".password-value").textContent.trim();
  const status = document.querySelector(".copy-status");

  try {
    await navigator.clipboard.writeText(password);
    button.textContent = "Copied";
    status.textContent = "Wi-Fi password copied to clipboard.";
    window.setTimeout(() => {
      button.textContent = "Copy";
      status.textContent = "";
    }, 2000);
  } catch (error) {
    status.textContent = "Unable to copy automatically. Select the password to copy it.";
    console.error("Could not copy the Wi-Fi password to the clipboard.", error);
  }
});
