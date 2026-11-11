import React from 'react';
import { MessageSquare, X, ArrowUpRight, User, AlertCircle } from 'lucide-react';
import { MOCK_CHATS } from '../data/scrumData';

interface ChatSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChatPreset: (preset: { sector: string; description: string }) => void;
}

export const ChatSimulator: React.FC<ChatSimulatorProps> = ({
  isOpen,
  onClose,
  onSelectChatPreset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-lg max-w-lg w-full max-h-[85vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Mensajes Entrantes de Clientes (Chat / WhatsApp)</h3>
              <p className="text-[11px] text-slate-500">
                Seleccione un mensaje para cargarlo a la mesa de soporte y validar el flujo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chats List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50/50">
          <div className="p-2.5 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-900">
            Haga clic en <span className="font-semibold">"Transferir a Mesa"</span> para poblar el formulario de soporte con el reporte del cliente.
          </div>

          {MOCK_CHATS.map((chat, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2 hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>{chat.customer}</span>
                </span>
                <span className="text-[11px] text-slate-500">{chat.time}</span>
              </div>

              {/* Chat bubble */}
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-800">
                {chat.text.trim().length === 0 ? (
                  <span className="italic text-slate-500">(Mensaje recibido con solo 3 espacios en blanco: "   ")</span>
                ) : (
                  <span>"{chat.text}"</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px]">
                  <span className="text-slate-500 mr-1.5">Sector detectado:</span>
                  {chat.sector ? (
                    <span className="font-semibold text-slate-900">{chat.sector}</span>
                  ) : (
                    <span className="text-red-600 font-medium inline-flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Sin sector (Provocará rechazo CP03)
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectChatPreset({
                      sector: chat.suggestedSector,
                      description: chat.suggestedDesc
                    });
                    onClose();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-medium transition-colors shadow-xs"
                >
                  <span>Transferir a Mesa</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 text-center text-[11px] text-slate-500 bg-white">
          Simulación con datos ficticios para el caso de estudio del ISP.
        </div>
      </div>
    </div>
  );
};
