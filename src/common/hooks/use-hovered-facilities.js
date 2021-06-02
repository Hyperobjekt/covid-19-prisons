import { useMapHovered } from "@hyperobjekt/svg-maps"
import { useMemo } from "react"
import useMappableFacilities from "./use-mappable-facilities"

export default function useHoveredFacilities() {
  const [hovered] = useMapHovered()
  const spikes = useMappableFacilities()
  return useMemo(() => {
    return hovered
      ? spikes.filter((d) => d.state === hovered.properties.name)
      : spikes
  }, [hovered, spikes])
}
