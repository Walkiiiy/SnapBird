import React, {createContext, useState} from 'react';

// 创建一个 Context，初始值为一个包含空用户和更新函数的对象
export const UserContext = createContext({
  user: null,
  setUser: () => {}, // 用于更新用户的空函数
});
export const FileUploadContext = createContext({
  fileUpload: [],
  setFileUpload: () => {}, // 用于更新用户的空函数
});
export const FileOutcomeContext = createContext({
  fileOutcome: [],
  setFileOutcome: () => {},
});
export const FileTypeContext = createContext({
  fileType: [],
  setFileType: () => {},
});
