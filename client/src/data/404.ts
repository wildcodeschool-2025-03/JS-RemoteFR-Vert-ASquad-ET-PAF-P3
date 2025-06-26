export function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

export const messages = [
  "Comme ce bug qu'on n'arrive jamais à reproduire… Il a disparu aussi vite que cette page !",
  "Cette page est partie chercher un café. Revenez dans 5 minutes… ou jamais, comme le ticket Jira !",
  "On a laissé le stagiaire déployer, voilà le résultat. (On plaisante, il est très compétent… parfois.)",
  "Cette page a été refactorisée… puis supprimée… puis recréée… puis re-supprimée. Bref, elle n'existe plus.",
  "Cette page est en prod, mais seulement le vendredi à 18h.",
  "Le chef de projet a dit qu'elle était prête. On la cherche encore.",
  "Cette page est partie déposer des CV… On espère qu'elle aura plus de réponses que nous !",
  "Comme ma dernière candidature : pas de réponse, pas de trace, disparue dans le néant !",
];
