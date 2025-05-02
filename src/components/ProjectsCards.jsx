import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { projectData } from "../data/ProjectData";
import { useViewport } from "../utils/ViewportContext";

export default function ProjectsCards() {
  const { width } = useViewport();
  const mobile_breakpoint = 480;
  let isMobile = width <= mobile_breakpoint;
  return (
    <section>
      <div>
        <div></div>
      </div>
    </section>
  );
}
