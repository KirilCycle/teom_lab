import { userModule } from "@/store/userModule";
import { createStore } from "vuex";
import { chatModule } from "./chatModule";
import { messageModule } from "./selectedMessageModule";
import { chatLoadingPreviewModule  } from './chatInLoadingMsgsPreviewModule'
import { chatAdditionalDataManageModule  } from './chatAdditionalDataManageModule.js'
 
export default createStore({
  modules: {
    user: userModule,
    chat: chatModule,
    message: messageModule,
    previewChat: chatLoadingPreviewModule,
    chatAdditionalDataManage:chatAdditionalDataManageModule 
  },
});
