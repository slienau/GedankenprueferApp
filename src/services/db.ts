import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import universelleGS from "../resources/universelle-glaubenssaetze";

export enum GlaubenssatzStatusType {
  Leer = "   ",
  Einschraenkend = "einschränkender Glaubenssatz",
  OffenFuerZweifel = "Glaubenssatz offen für Zweifel",
  MuseumAlterGS = "Museum alter Glaubenssätze",
  PositiverGS = "Positiver Glaubenssatz",
}

export type GlaubenssatzDataItem = {
  id: number;
  title: string;
  q1_isThatTrue?: boolean;
  q2_isThatAbsolutelyTrue?: boolean;
  q3_whatHappensIfYouBelieveTheThought?: string;
  q4_whoWouldYouBeWithoutTheThought?: string;
  dateCreated: string;
  dateUpdated: string;
  isUniversal: boolean;
  status: GlaubenssatzStatusType;
  inversions: Record<string, Array<string>>; // key: inversion; value: array of examples
  positiveExamples: Array<string>;
};

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  return SQLite.openDatabase("db.db");
}

const db = openDatabase();

export const initDb = () => {
  console.log("init db");
  db.transaction((tx) => {
    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS glaubenssaetze (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
      title TEXT, 
      q1_isThatTrue INTEGER, 
      q2_isThatAbsolutelyTrue INTEGER, 
      q3_whatHappensIfYouBelieveTheThought TEXT, 
      q4_whoWouldYouBeWithoutTheThought TEXT, 
      dateCreated TEXT, 
      dateUpdated TEXT, 
      isUniversal INTEGER, 
      status TEXT, 
      inversions TEXT)
    `);
  });

  // check if there are any glaubenssaetze in the database
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM glaubenssaetze", [], (_, { rows }) => {
      if (rows.length === 0) {
        // insert universelle glaubenssaetze
        console.log(
          "glaubenssatz db empty - inserting universelle glaubenssaetze into db",
        );
        universelleGS.forEach((title) => {
          insertGlaubenssatz(title, true);
        });
        console.log("inserted universelle glaubenssaetze");
      } else {
        console.log("glaubenssatz db not empty");
      }
    });
  });
};

export const insertGlaubenssatz = (
  title: string,
  isUniversal: boolean = false,
) => {
  console.debug("db --- insertGlaubenssatz", title, isUniversal);
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO glaubenssaetze 
        (
          title, 
          dateCreated,
          dateUpdated,
          isUniversal, 
          status, 
          inversions
        ) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          title,
          new Date().toISOString(),
          new Date().toISOString(),
          isUniversal ? 1 : 0,
          GlaubenssatzStatusType.Leer,
          JSON.stringify({}),
        ],
      );
    });
  } catch (error) {
    console.error("Failed to insert Glaubenssatz:", error);
  }
};

export const updateTitle = (id: number, title: string) => {
  console.debug("db --- updateTitle", id, title);
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE glaubenssaetze SET title = ?, dateUpdated = ? WHERE id = ?",
      [title, new Date().toISOString(), id],
    );
  });
};

export const updateQ1 = (id: number, q1: boolean) => {
  console.debug("db --- updateQ1", id, q1);
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE glaubenssaetze SET q1_isThatTrue = ?, dateUpdated = ? WHERE id = ?",
      [q1 ? 1 : 0, new Date().toISOString(), id],
    );
  });
};

// Do the same for the rest of the update functions

export const updateQ2 = (id: number, q2: boolean) => {
  console.debug("db --- updateQ2", id, q2);
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE glaubenssaetze SET q2_isThatAbsolutelyTrue = ?, dateUpdated = ? WHERE id = ?",
      [q2 ? 1 : 0, new Date().toISOString(), id],
    );
  });
};

export const updateQ3 = (id: number, q3: string) => {
  console.debug("db --- updateQ3", id, q3);
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE glaubenssaetze SET q3_whatHappensIfYouBelieveTheThought = ?, dateUpdated = ? WHERE id = ?",
      [q3, new Date().toISOString(), id],
    );
  });
};

export const updateQ4 = (id: number, q4: string) => {
  console.debug("db --- updateQ4", id, q4);
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE glaubenssaetze SET q4_whoWouldYouBeWithoutTheThought = ?, dateUpdated = ? WHERE id = ?",
      [q4, new Date().toISOString(), id],
    );
  });
};

export const updateStatus = (id: number, status: GlaubenssatzStatusType) => {
  console.debug("db --- updateStatus", id, status);
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE glaubenssaetze SET status = ?, dateUpdated = ? WHERE id = ?",
      [status, new Date().toISOString(), id],
    );
  });
};

export const updateInversions = (
  id: number,
  inversions: Record<string, Array<string>>,
) => {
  console.debug("db --- updateInversions", id, inversions);
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE glaubenssaetze SET inversions = ?, dateUpdated = ? WHERE id = ?",
      [JSON.stringify(inversions), new Date().toISOString(), id],
    );
  });
};

export const deleteGlaubenssatz = (id: number) => {
  console.debug("db --- deleteGlaubenssatz", id);
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM glaubenssaetze WHERE id = ?", [id]);
  });
};

export const getGlaubenssatzById = (
  id: number,
  callback: (data: GlaubenssatzDataItem) => void,
) => {
  console.debug("db --- getGlaubenssatzById", id);
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM glaubenssaetze WHERE id = ?",
      [id],
      (_, { rows }) => {
        let data: GlaubenssatzDataItem = rows._array[0];
        if (data && data.inversions) {
          try {
            // @ts-ignore
            data.inversions = JSON.parse(data.inversions);
          } catch (error) {
            console.error("Failed to parse inversions:", error);
          }
        }
        callback(data);
      },
    );
  });
};

export const getGlaubenssaetze = (callback: {
  (data: GlaubenssatzDataItem[]): void;
}) => {
  console.debug("db --- getGlaubenssaetze");
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM glaubenssaetze", [], (_, { rows }) => {
      let data: GlaubenssatzDataItem[] = rows._array;
      data.forEach((item) => {
        if (item.inversions) {
          try {
            // @ts-ignore
            item.inversions = JSON.parse(item.inversions);
          } catch (error) {
            console.error("Failed to parse inversions:", error);
          }
        }
      });
      console.debug("db --- getGlaubenssaetze length", data.length);
      callback(data);
    });
  });
};
