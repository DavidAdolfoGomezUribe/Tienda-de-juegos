import { getDB,connect } from "./src/db/config.js";
import {log} from "console"

await connect();

let db = getDB();
log(db)