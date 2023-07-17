import * as fcl from "@onflow/fcl";
import { singleUserTransaction } from "@/utils/transcation";
import { userScript } from "@/utils/scripts";

import { getSongByIdScript } from "@/cadence/scripts";
import { addSongTransaction } from "@/cadence/transactions";

class SongService {
  getSong = async ([url, id]: [string, string]) => {
    try {
      const data = await singleUserTransaction({
        code: getSongByIdScript,
        args: [fcl.arg(id, fcl.t.String)],
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  addSong = async (song: any) => {
    try {
      const data = await singleUserTransaction({
        code: addSongTransaction,
        args: [
          fcl.arg(song.id, fcl.t.String),
          fcl.arg(song.name, fcl.t.String),
          fcl.arg(song.freeUrl, fcl.t.String),
          fcl.arg(song.img, fcl.t.String),
        ],
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

const songService = new SongService();
export default songService;
