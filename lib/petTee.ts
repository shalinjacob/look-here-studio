// Shared by the live preview and the cart so the wording matches what is printed.

/** the printed line: "SIMBA’S DAD". A trailing 's the customer typed is not doubled. */
export function petLine(name: string, who: string, fallbackName = "LUCA", fallbackWho = "MOM") {
  const typed = name.trim().replace(/['’]s$/i, "");
  const title = who.trim();
  const n = (typed || fallbackName).toUpperCase();
  const w = (title || fallbackWho).toUpperCase();
  return { line: `${n}’S ${w}`, n, w, typed: typed.length > 0 };
}

/** how the text reads in the cart and emails: "Simba's Dad" */
export function petText(name: string, who: string) {
  const typed = name.trim().replace(/['’]s$/i, "");
  const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s);
  const first = typed ? typed[0].toUpperCase() + typed.slice(1) : "";
  return `${first}'s ${cap(who.trim())}`;
}
