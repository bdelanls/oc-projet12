import React from 'react'
import { Link } from 'react-router-dom'
import { config } from '../../services/config'

const Erreur404 = () => {
  return (
    <div>
      <h2>Aucune donnée trouvée</h2>
      <p>L'utilisateur que vous recherchez n'existe pas.</p>
      {config.useMock && (
        <div>
          <p>Vous êtes en mode développement, vous pouvez essayer les utilisateurs suivants :</p>
          <ul>
            <li><Link to="/dashboard/12">User 12</Link></li>
            <li><Link to="/dashboard/18">User 18</Link></li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Erreur404
