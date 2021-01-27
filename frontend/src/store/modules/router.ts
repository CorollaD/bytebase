import { RouteLocationNormalized } from "vue-router";
import { RouterSlug } from "../../types";

export interface RouterState {}

const getters = {
  backPath: (state: RouterState) => (): string => {
    return localStorage.getItem("ui.backPath") || "/";
  },
  routeSlug: (state: RouterState) => (
    currentRoute: RouteLocationNormalized
  ): RouterSlug => {
    // /pipeline/<<pipeline-id>>
    // Total 2 elements, 2nd element is the pipeline id
    const pipelineComponents = currentRoute.path.match(
      "/pipeline/([0-9a-zA-Z_]+)"
    ) || ["/", undefined];
    if (pipelineComponents[1]) {
      return {
        pipelineId: pipelineComponents[1],
      };
    }
    return {};
  },
};

const actions = {
  setBackPath({ commit }: any, backPath: string) {
    localStorage.setItem("ui.backPath", backPath);
    return backPath;
  },
};

export default {
  namespaced: true,
  getters,
  actions,
};
