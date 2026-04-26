export default function HelpPage() {
  return (
    <div className="container">
      <h1>Aide</h1>

      <div className="summary">
        <h2>Activer la synthèse vocale japonaise sur Windows</h2>
        <p style={{ marginBottom: '1rem', color: '#555' }}>
          Si le son ne fonctionne pas, la langue japonaise doit être installée sur votre PC.
        </p>
        <ol style={{ textAlign: 'left', lineHeight: '2' }}>
          <li>
            Ouvrez <strong>Paramètres</strong>
          </li>
          <li>
            Allez dans <strong>Heure et langue</strong>
          </li>
          <li>
            Cliquez sur <strong>Langue et région</strong>
          </li>
          <li>
            Ajoutez le <strong>Japonais</strong> comme langue
          </li>
          <li>Redémarrez votre navigateur</li>
        </ol>
      </div>
    </div>
  );
}
