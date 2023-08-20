window.addEventListener("load", () => {
    const d = new Date();
    document.querySelector("input#starting").value = `${d.getUTCFullYear()}-${parseInt(d.getUTCMonth() + 1).toString().padStart(2, "0")}-${parseInt(d.getUTCDate()).toString().padStart(2, "0")}`
    const srcParams = new URLSearchParams(location.search);
    
    if (!["tr", "en", "de"].includes(srcParams.get("lang"))) {
        if (document.querySelector(`.lang.${navigator.language}`)) {
            document.querySelector(`.lang.${navigator.language}`).style.border = "2px solid orange";
            if (navigator.language == "tr") {
                document.querySelector("fieldset legend").innerHTML = "Kolayca sayaçlar oluştur ve paylaş!";
                document.querySelector("p:has(input#starting)").innerHTML = "Başlangıç: <input type=\"date\" id=\"starting\">";
                document.querySelector("p:has(input#ending)").innerHTML = "Bitiş: <input type=\"date\" id=\"ending\">";
                document.querySelector("button#ok").innerHTML = "Bitti";
                document.querySelector("input#title").placeholder = "Sayacın için bir başlık";
            }
            else if (navigator.language == "de") {
                document.querySelector("fieldset legend").innerHTML = "Einfach Zähler erstellen und teilen!";
                document.querySelector("p:has(input#starting)").innerHTML = "Anfang: <input type=\"date\" id=\"starting\">";
                document.querySelector("p:has(input#ending)").innerHTML = "Ende: <input type=\"date\" id=\"ending\">";
                document.querySelector("button#ok").innerHTML = "Fertig";
                document.querySelector("input#title").placeholder = "Einfach Zähler erstellen und teilen!";
            }
            window.lang = navigator.language;
        }
        else {
            document.querySelector(`.lang.en`).style.border = "2px solid orange";
        }
    }
    document.querySelector(".lang.tr").addEventListener("click", () => {
        location.href = "/?lang=tr";
    });
    document.querySelector(".lang.en").addEventListener("click", () => {
        location.href = "/?lang=en";
    });
    document.querySelector(".lang.de").addEventListener("click", () => {
        location.href = "/?lang=de";
    });
    if (["tr", "en", "de"].includes(srcParams.get("lang"))) {
        document.querySelector(`.lang.${srcParams.get("lang")}`).style.border = "2px solid orange";
        window.lang = srcParams.get("lang");
    }
    if (srcParams.get("lang") == "tr") {
        document.querySelector("fieldset legend").innerHTML = "Kolayca sayaçlar oluştur ve paylaş!";
        document.querySelector("p:has(input#starting)").innerHTML = "Başlangıç: <input type=\"date\" id=\"starting\">";
        document.querySelector("p:has(input#ending)").innerHTML = "Bitiş: <input type=\"date\" id=\"ending\">";
        document.querySelector("button#ok").innerHTML = "Bitti";
        document.querySelector("input#title").placeholder = "Sayacın için bir başlık";
    }
    else if (srcParams.get("lang") == "de") {
        document.querySelector("fieldset legend").innerHTML = "Einfach Zähler erstellen und teilen!";
        document.querySelector("p:has(input#starting)").innerHTML = "Anfang: <input type=\"date\" id=\"starting\">";
        document.querySelector("p:has(input#ending)").innerHTML = "Ende: <input type=\"date\" id=\"ending\">";
        document.querySelector("button#ok").innerHTML = "Fertig";
        document.querySelector("input#title").placeholder = "Einfach Zähler erstellen und teilen!";
    }
});

document.querySelector("button#ok").addEventListener("click", () => {
    var starting = Date.parse(new Date(document.querySelector("input#starting").value));
    var ending = Date.parse(new Date(document.querySelector("input#ending").value));
    var title = document.querySelector("input#title").value;
    if (!starting || !ending) {
        let msg = fieldFill[window.lang] || fieldFill["en"];
        message(msg, "red");
    }
    else if (starting > ending) {
        let msg = dateComp[window.lang] || dateComp["en"];
        message(msg, "red");
    }
    else {
        if (window.lang == "tr") {
            message(`Başarılı! Sayacınız <a href=\"/page/?s=${starting}&e=${ending}&t=${title}\">burada</a>!`, "limegreen", 0);
        }
        else if (window.lang == "de") {
            message(`Erfolgreich! Ihr Zähler <a href=\"/page/?s=${starting}&e=${ending}&t=${title}\">hier</a>!`, "limegreen", 0);
        }
        else {
            message(`Success! <a href=\"/page/?s=${starting}&e=${ending}&t=${title}\">Here's</a> your timer!`, "limegreen", 0)
        }
    }
});

fieldFill = {
    tr: "Lütfen başlangıç ve bitiş tarihlerini girin!",
    en: "Please fill in starting and ending fields!",
    de: "Bitte füllen Sie die Start-und Endabschnitte aus!"
}

dateComp = {
    tr: "Bitiş tarihi başlangıç tarihinden daha erken olamaz!",
    en: "Ending date cannot be earlier then the starting date!",
    de: "Das Enddatum darf nicht früher als das Startdatum sein!"
}

const message = (str, col, dur = 1500) => {
    document.querySelector("span.error").innerHTML = str;
    document.querySelector("span.error").style.color = col;
    document.querySelector("span.error").style.opacity = "1";
    if (dur == 0) return;
    setTimeout(() => {
        document.querySelector("span.error").style.opacity = "0";
    }, dur);
}