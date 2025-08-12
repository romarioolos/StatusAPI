import React, { useEffect, useState } from "react";
import Modal from "./components/modal";

const initialApis = [
  { name: "WS Agent Command", url: "http://10.15.5.52/WsAgentControl/WSAgentCommandJSON.asmx" },
  { name: "WS Agent Config", url: "http://10.15.5.52/wsConfiguration/WSAgentConfig.asmx" },
  { name: "WS Agent Event", url: "http://10.15.5.52/WsAgentControl/WsAgentEventJSON.asmx" },
  { name: "WS Mailing Command", url: "http://10.15.5.52/WsMailingControl/wsMailingCommand.asmx" },
  { name: "WS Integration", url: "http://10.15.5.52/WSIntegration_1_6/WsIntegrationJSON.asmx" },
  { name: "WS Integration Origin", url: "http://10.15.5.52/WsIntegrationOrigin/WsIntegration.asmx" },
  { name: "WS Integration Command API", url: "http://10.15.5.52/WebAPIIntegration/IntegrationCommand" },
  { name: "WS Eaglle", url: "http://10.15.5.52/WsEaglle/wseaglle.asmx" },
  { name: "WS MCX", url: "http://10.15.5.52/WsMcx/wsmcx" },
  { name: "Recording Retrieve", url: "http://10.15.5.52/RecordingRetrieve/" },
  { name: "WebAPI Recording Retrieve", url: "http://10.15.5.52/WebApiRecordingRetrieve" },
  { name: "WS Voice Support", url: "http://10.15.5.52/WsVoiceSupportIntegration/WsVoiceSupportIntegration.asmx" },
  { name: "WS Eaglle CS Service", url: "http://10.15.5.52/WsOlosEaglleCS/EaglleCSService.svc" },
  { name: "Eaglle Service API", url: "http://10.15.5.52/EaglleService/API/" },
  { name: "WS SoftPhone", url: "http://10.15.5.52/WebApiSoftphone/Softphone/" },
  { name: "WS Agent Cloud", url: "http://10.15.5.52/WsAgentControl_5.11.1/WsCloudAgent.asmx" },
  { name: "WebApiChanneling", url: "http://10.15.5.52/WebApiChanneling" }
];

export default function ApiStatusDashboard() {
  const [apis, setApis] = useState(initialApis);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(99);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newApiName, setNewApiName] = useState("");
  const [newApiUrl, setNewApiUrl] = useState("");

  // Função para adicionar nova API
  const addNewApi = () => {
    if (newApiName.trim() && newApiUrl.trim()) {
      const newApi = { name: newApiName.trim(), url: newApiUrl.trim() };
      setApis(prev => [...prev, newApi]);
      setNewApiName("");
      setNewApiUrl("");
      //setShowAddForm(false);
    }
  };

  // Função para remover API
  const removeApi = (index) => {
    setApis(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const checkApis = async () => {
      setLoading(true);
      const results = await Promise.all(
        apis.map(async ({ name, url }) => {
          try {
            // Tenta GET primeiro
            let res = await fetch(url, { method: "GET" });
            if (!res.ok) {
              // Se GET falhar, tenta POST
              res = await fetch(url, { method: "POST" });
            }
            
            // Trata erro 500 como online mas com erro
            if (res.status === 500) {
              return { name, url, status: "error", code: res.status };
            }
            
            if (res.ok) {
              return { name, url, status: "online", code: res.status };
            } else {
              return { name, url, status: "error", code: res.status };
            }
          } catch {
            return { name, url, status: "offline", code: null };
          }
        })
      );
      setStatus(results);
      setLoading(false);
      setCountdown(99); // Reset countdown após atualização
    };

    checkApis();
    const interval = setInterval(checkApis, 99000); // atualiza a cada 99s
    
    // Countdown timer - atualiza a cada segundo
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 99);
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, [apis]);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "error":
        return "bg-yellow-500";
      case "offline":
      default:
        return "bg-red-500";
    }
  };

  return (
    <div className=" bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📡 Status das APIs</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            ➕ Adicionar API
          </button>
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-gray-400 text-sm">Próxima atualização em: </span>
            <span className="text-blue-400 font-bold text-lg">
              {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Formulário para adicionar nova API */}
      {showAddForm && (  
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-600">
            <h2 className="text-xl font-bold mb-4">Adicionar Nova API</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome da API
              </label>
              <input
                type="text"
                value={newApiName}
                onChange={(e) => setNewApiName(e.target.value)}
                placeholder="Ex: Minha API"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL da API
              </label>
              <input
                type="url"
                value={newApiUrl}
                onChange={(e) => setNewApiUrl(e.target.value)}
                placeholder="Ex: https://api.exemplo.com"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={addNewApi}
              disabled={!newApiName.trim() || !newApiUrl.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-600">
        <table className="w-full border-collapse">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-r border-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-r border-gray-600">
                Nome da API
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-r border-gray-600">
                URL
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-r border-gray-600">
                Código
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-r border-gray-600">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-gray-600">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {/* GIF de Loading */}
                    <img 
                    style={{ width: '40px', height: '40px' }}
                      src="http://i.gifer.com/ZKZg.gif" 
                      alt="Loading..." 
                      className="w-10 h-10"
                    />
                    
                  </div>
                  <span className="text-gray-400 text-lg">Carregando status das APIs...</span>
                </td>
              </tr>
            ) : (
              status.map((api, i) => (
                <tr key={i} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-right border-r border-gray-600">
                    <span
                      className={`w-4 h-4 rounded-full inline-block ${getStatusColor(api.status)}`}
                    ></span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right border-r border-gray-600">
                    <div className="text-sm font-medium text-white">{api.name}</div>
                  </td>
                  <td className="px-6 py-4 text-right border-r border-gray-600">
                    <div className="text-sm text-gray-400 break-all max-w-md">{api.url}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right border-r border-gray-600">
                    <div className="text-sm text-gray-300">
                      {api.code || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right border-r border-gray-600">
                    {api.status === "online" && (
                      <span className="text-green-400 font-bold text-sm">
                        ✅ Online
                      </span>
                    )}
                    {api.status === "error" && (
                      <span className="text-yellow-400 font-bold text-sm">
                        ⚠️ Erro
                      </span>
                    )}
                    {api.status === "offline" && (
                      <span className="text-red-400 font-bold text-sm">
                        ❌ Offline
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {i >= initialApis.length && ( // Só mostra o botão de remover para APIs adicionadas pelo usuário
                      <button
                        onClick={() => removeApi(i)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Remover API"
                      >
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
