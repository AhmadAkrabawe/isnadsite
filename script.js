document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const processBtn = document.getElementById('processBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Characters to remove
    const charsToRemove = ["َ", "ُ", "ِ", "ُ", "ْ", "ٌ", "ٍ", "ّ", ":"];
    const newlineChars = ["،", "."];
    const wordsToRemove = [
        "عن", "حدثنا", "أخبرنا", "أن ", "أنه ", "يخبر", "قال", "أخبرني", "قالا",
        "يحدث", "سمع", "نا ", "ثنا", "أنا ", "أنبأنا", "أنبأني", "سمعت", "نبأنا",
        "نبأني", "أنبا", "نبا", "قالوا", "جميعا", "حدثني", "قالت",
        "وعن", "وحدثنا", "وأخبرنا", "وأن ", "وأنه", "ويخبر", "وقال", "وأخبرني", "وقالا",
        "ويحدث", "وسمع", "ونا", "وثنا", "وأنا", "وأنبأنا", "وأنبأني", "وسمعت", "ونبأنا",
        "ونبأني", "وأنبا", "ونبا"
    ];

    function processText(text) {
        // Remove unwanted characters
        for (const char of charsToRemove) {
            text = text.replaceAll(char, '');
        }

        // Replace specific characters with newlines
        for (const char of newlineChars) {
            text = text.replaceAll(char, '\n');
        }

        // Remove unwanted words
        for (const word of wordsToRemove) {
            text = text.replaceAll(word, '');
        }

        // Split into lines and add tabs
        const lines = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const linesWithTabs = lines.map((line, index) => {
            return '\t'.repeat(index) + line;
        });

        return linesWithTabs.join('\n');
    }

    processBtn.addEventListener('click', () => {
        const input = inputText.value;
        const processed = processText(input);
        outputText.value = processed;
    });

    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            inputText.value = text;
        } catch (err) {
            alert('لم نتمكن من الوصول إلى الحافظة. الرجاء نسخ النص يدويًا.');
        }
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(outputText.value);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'تم النسخ!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            alert('حدث خطأ أثناء النسخ. الرجاء النسخ يدويًا.');
        }
    });
});
