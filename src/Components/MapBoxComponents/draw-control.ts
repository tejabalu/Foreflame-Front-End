import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";
import { doc, getDoc } from "firebase/firestore";
import type { ControlPosition, MapRef } from "react-map-gl";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
  initialDrawFeatures: any;
  colRef: any;
};

function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    () => {
      const draw = new MapboxDraw(props);
      getDoc(doc(props.colRef, "drawFeatures"))
        .then((docSnap) => {
          const downloaded = docSnap.data();
          if (downloaded) {
            const prevFeatures = JSON.parse(downloaded.data);
            for (const f in prevFeatures) {
              draw.add(prevFeatures[f]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return draw;
    },

    ({ map }: { map: MapRef }) => {
      if (props.onCreate) map.on("draw.create", props.onCreate);
      if (props.onUpdate) map.on("draw.update", props.onUpdate);
      if (props.onDelete) map.on("draw.delete", props.onDelete);
    },
    ({ map }: { map: MapRef }) => {
      if (props.onCreate) map.off("draw.create", props.onCreate);
      if (props.onUpdate) map.off("draw.update", props.onUpdate);
      if (props.onDelete) map.off("draw.delete", props.onDelete);
    },
    {
      position: props.position,
    }
  );

  return null;
}

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
};

export default DrawControl;
