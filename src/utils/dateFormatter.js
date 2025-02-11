export function formatarDataParaBrasileiro(dataAmericana) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataAmericana)) {
    console.error("Formato de data inválido. Use o formato AAAA-MM-DD.");
    return dataAmericana;
  }
  const [ano, mes, dia] = dataAmericana.split("-");
  return `${dia}/${mes}/${ano}`;
}
