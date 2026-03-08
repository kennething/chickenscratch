import { Match, ServerType, SocketType } from "../utils/types";
import { matches } from "../utils/data";

export async function pollFrame(io: ServerType, socket: SocketType, blob: ArrayBuffer): Promise<void> {
  if (!socket.data.pairUuid) return;
  socket.to(socket.data.pairUuid).emit("getFrame", blob);

  const mainSocket = (await io.in(socket.data.pairUuid).fetchSockets()).find((s) => s.data.uuid === socket.data.pairUuid);
  if (!mainSocket) return;

  const sdiugvdius = await Match.validateImage(blob);
  console.log(sdiugvdius);
  if (!mainSocket.data.matchUuid) return;

  const match = matches.get(mainSocket.data.matchUuid);
  if (!match || (match.currentSplit === 0 && match.timeRemaining === 20)) return;

  const [isCorrect, nextWord] = match.submitWord(blob, socket.data.pairUuid!);
  mainSocket.emit("getResult", isCorrect, nextWord ?? undefined);
}
