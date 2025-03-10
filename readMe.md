Nous avons un service TripService qui permet d’obtenir les voyages (Trip) d’un utilisateur (User).
Le problème ? Ce service est difficile à tester car :

Il dépend d'un accès direct à TripDAO, qui récupère les données depuis une base de données.
Il dépend d’un utilisateur connecté (loggedUser), qui est récupéré via une classe statique (UserSession).
L’objectif est de refactorer ce service pour rendre son code testable, en supprimant les dépendances cachées.