# BAUHAUS JS 2 Idee
Hab ne Idee wie wir das überwiegend ohne die beiden Frameworks relativ leicht lösen können. (Vielleicht können wir zu Teilen Feathers verwenden.) 

Hab mir n paar Ideen bei Feathers abgeschaut ;-)

Als Grundlage nehmen wir Sequelize. Darin kann man seine Models definieren. Können ja eine Ordnerstruktur festlegen (z.B. alle models in  /models )

# Services
Weiter werden alle Funktionen als **Services** definiert. Zum Beispiel so:

```js
export default {
  name: 'AddNewPost',
  description: 'Service to create a new Post',
  params: {
    name: 'The name of the post',
    text: 'The content of the post',
    userId: 'The userId of the creator'
  },
  function: (params) => {
    var p = new Promise()
    var post = new Post({
      name: params.name,
      text: params.text,
      creator: params.userId
    })
    post.save((err) => {
      if (err) {
        return p.reject(err)
      }
      p.resolve()
    })
    return p
  }
}
```

Hier wird lediglich eine bestimmte Funktion definiert mit ihren Parametern, weiter nichts, also auch keine Berechtigungen, keine request oder response object. So kann man sich hier nur auf die reine Funktionalität konzentrieren.

Diese **Services** könnte man auch in einen extra Ordner legen um ne ordentliche Struktur reinzubekommen.

Um jetzt nicht für jedes Model jedes mal alle CRUD Funktionen zu implementieren, kann man einfach einen Generator bauen der für jedes Sequelize Model die CRUD **Services** generiert.

# Role Mapping
Um nun Berechtigungen für einen **Service** zu setzen würde ich eine Art Rollen-Tabelle anlegen:

ID | Service    | ROLE
-- | ---------- | ------------
0  | AddNewPost | COLLABORATOR
1  | AddNewPost | ADMIN

Diese Tabelle würde im Prinzip aussagen, dass der Nutzer der den Service AddNewPost aufrufen will die Rollen COLLABORATOR oder ADMIN haben muss. Wenn ein **Service** nicht eingetragen ist, ist er nicht erreichbar.

Da aber oft Rollen allein nicht reichen und man Benutzerdefinierte Berechtigungen benötigt, können noch über zwei weitere Felder ROLE_FUNCTIONS aufgerufen werden:

ID | Service       | ROLE         | ROLE-FUNCTION | PARAMS
-- | ------------- | ------------ | ------------- | ----------------------------------------
0  | AddNewPost    | COLLABORATOR | NULL          | NULL
1  | AddNewPost    | ADMIN        | NULL          | NULL
2  | ChangeProject | NULL         | PROJECT_OWNER | {"id": "params.id", "userId": "user.id"}

Um hier das Project zu verändern muss der Nutzer Project-Owner sein. Das kann aber nicht einfach so bestimmt werden. Dafür werden noch Parameter gebraucht. In den Values des PARAMS objektes kann auf die params des **Services** zugegriffen werden, sowie auf das user Object.

Eine ROLE-FUNCTION könnte so definiert werden:

```js
export default {
  name: 'PROJECT_OWNER',
  description: 'Check if User is owner of a project',
  params: {
    id: 'The project ID',
    userId: 'The userId'
  },
  function: (params) => {
    var p = new Promise()
    // Check if user is owner of the project
    return p
  }
}
```

# REST Mapping

Um jetzt von außen die **Services** erreichen zu können, werden sie auf einen REST endpoint gemappt. Dies könnte z.B. so aussehen:

ID | PATH         | Service       | METHOD | CONTENT-TYPE                      | PARAMS
-- | ------------ | ------------- | ------ | --------------------------------- | ---------------------------------------------------------------
0  | /post        | AddNewPost    | POST   | application/json                  | {"name": "body.name", "text": "body.text", "userId": "user.id"}
0  | /post        | AddNewPost    | POST   | application/x-www-form-urlencoded | {"name": "body.name", "text": "body.text", "userId": "user.id"}
1  | /project/:id | ChangeProject | PUT    | application/json                  | {"id": "params.id", "data": "body"}

Die PARAMS sind die selben die im **Service** definiert wurden. In den values kann man auf `body`, `params`, `query`, `req` und `res` zugreifen und so die benötigten Parameter weitergeben.

# Zusammenfassung

- Alle Funktionalitäten sind Services
   - Services sind pure Funktionen die einen Promise oder Direkt werte zurrückgeben
   - Services sollten (in der Regel) nicht vom req oder res Object abhängig sein.
   - Services prüfen keine Berechtigungen
- Jeder Service muss um erreichbar zu sein eine Zeile im Role-Mapping haben
- Die Services können dann im REST-Mapping auf einen endpoint gebunden werden

# Vorteile

- Kein express middleware Wulst mehr.
- Alles ist ein Service
- Klare Rechtevergabe
- Standard-Services können automatisch generiert werden  
- Automatisch generierte Services müssen explizit eingebunden und freigegeben werden
- Keine Nebeneffekte
- Berechtigungen werden direkt an der Quelle definiert.
- Services könnten später auch per Socket.IO anbunden werden.
