export function getAuthHeader() {
  // richieste dal browser verso /api/proxy/... non usano header
  return {};
}
