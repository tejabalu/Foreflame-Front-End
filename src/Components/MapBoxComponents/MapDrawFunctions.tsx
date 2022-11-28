import { CollectionReference, doc, DocumentData, setDoc } from "firebase/firestore";
import * as React from "react";

interface MapDrawPropsInterface {
  colRef: CollectionReference<DocumentData> | null;
  setDrawFeatures: React.Dispatch<React.SetStateAction<{}>>;
}

export function MapDrawFunctions({ colRef, setDrawFeatures }: MapDrawPropsInterface) {
  const onUpdate = (e: any) => {
    setDrawFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };

      for (const f of e.features) {
        const featureName = prompt("Please enter the name of the feature.");
        f["featureName"] = featureName;
        newFeatures[f.id] = f;
      }

      if (colRef) {
        setDoc(doc(colRef, "drawFeatures"), { data: JSON.stringify(newFeatures) })
          .then((e) => {
            console.log("Draw features written");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      return newFeatures;
    });
  };

  const onDelete = (e: any) => {
    setDrawFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }

      if (colRef) {
        setDoc(doc(colRef, "drawFeatures"), { data: JSON.stringify(newFeatures) })
          .then((e) => {
            console.log("Draw features written");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      return newFeatures;
    });
  };
  return { onUpdate, onDelete };
}
