import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useAvatarStore } from '../../store/avatarStore';
import { useUIStore } from '../../store/uiStore';
import { useCommunityStore } from '../../store/communityStore';
import { Avatar } from '../../three/Avatar';
import { Environment } from '../../three/Environment';
import { ClothingPanel } from '../ui/ClothingPanel';
import { CulturalModal } from '../ui/CulturalModal';
import { CaptureModal } from '../ui/CaptureModal';
import { WardrobePanel } from '../ui/WardrobePanel';

export function EditorScreen() {
  const { config, equipped, styling, currentPose, setPose } = useAvatarStore();
  const { darkMode, toggleDark, openCapture, toggleWardrobe, setScreen, logout, currentUser } = useUIStore();
  const { publish } = useCommunityStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPublish, setShowPublish] = useState(false);
  const [publishName, setPublishName] = useState('');
  const [publishTags, setPublishTags] = useState('');
  const [published, setPublished] = useState(false);

  const POSES = ['idle', 'pose', 'strut'] as const;
  const POSE_LABELS: Record<string, string> = { idle: 'Naturel', pose: 'Posé', strut: 'Défilé' };

  return (
    <div className="w-full h-full flex flex-col bg-canvas dark:bg-[#0A0A0A]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <button
            onClick={() => setScreen('landing')}
            className="flex items-center gap-2 text-charcoal dark:text-[#FAFAF8] hover:text-gold transition-colors"
          >
            <svg viewBox="0 0 32 32" className="w-6 h-6">
              <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="16" cy="16" r="3" fill="currentColor" />
            </svg>
            <span className="serif text-lg font-light tracking-wide hidden sm:block">ASA</span>
          </button>
        </div>

        {/* Center: pose selector */}
        <div className="flex gap-1">
          {POSES.map(p => (
            <button
              key={p}
              onClick={() => setPose(p)}
              className={`label text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 transition-all
                ${currentPose === p
                  ? 'bg-gold text-[#0A0A0A]'
                  : 'text-muted border border-transparent hover:border-border'}`}
            >
              {POSE_LABELS[p]}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Communauté */}
          <button
            onClick={() => setScreen('community')}
            className="p-2 text-muted hover:text-charcoal dark:hover:text-[#FAFAF8] transition-colors"
            title="Communauté"
          >
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z"/>
            </svg>
          </button>
          {/* Publier */}
          <button
            onClick={() => { setShowPublish(true); setPublished(false); }}
            className="p-2 text-muted hover:text-gold transition-colors"
            title="Publier ma création"
          >
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
            </svg>
          </button>
          <button
            onClick={toggleWardrobe}
            className="p-2 text-muted hover:text-charcoal dark:hover:text-[#FAFAF8] transition-colors"
            title="Garde-robe"
          >
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
              <path d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zM3 7a1 1 0 000 2h14a1 1 0 100-2H3zM3 11a1 1 0 000 2h14a1 1 0 100-2H3zM3 15a1 1 0 000 2h14a1 1 0 100-2H3z" />
            </svg>
          </button>

          <button
            onClick={openCapture}
            className="p-2 text-muted hover:text-charcoal dark:hover:text-[#FAFAF8] transition-colors"
            title="Capturer"
          >
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            onClick={toggleDark}
            className="p-2 text-muted hover:text-charcoal dark:hover:text-[#FAFAF8] transition-colors"
            title={darkMode ? 'Mode clair' : 'Mode sombre'}
          >
            {darkMode ? (
              <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {currentUser && (
            <button
              onClick={logout}
              className="p-2 text-muted hover:text-charcoal dark:hover:text-[#FAFAF8] transition-colors"
              title={`Déconnexion (${currentUser.name})`}
            >
              <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Canvas */}
        <div
          ref={containerRef}
          id="avatar-canvas-container"
          className="flex-1 relative"
          style={{ background: darkMode ? '#0A0A0A' : '#FAFAF8' }}
        >
          <Canvas
            shadows
            gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <PerspectiveCamera makeDefault position={[0, 0.9, 2.8]} fov={42} />
            <OrbitControls
              enablePan={false}
              minDistance={1.4}
              maxDistance={5}
              minPolarAngle={Math.PI * 0.1}
              maxPolarAngle={Math.PI * 0.85}
              autoRotate={currentPose === 'strut'}
              autoRotateSpeed={1.5}
              enableDamping
              dampingFactor={0.08}
              target={[0, 0.8, 0]}
            />
            <Suspense fallback={null}>
              <Environment darkMode={darkMode} />
              <Avatar
                config={config}
                equipped={equipped}
                styling={styling}
                pose={currentPose}
              />
            </Suspense>
          </Canvas>

          {/* Zoom hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className="label text-[9px] tracking-widest uppercase text-muted/40">
              Cliquer-glisser pour tourner · Molette pour zoomer
            </p>
          </div>

          {/* Config badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 left-4 flex flex-col gap-0.5 pointer-events-none"
          >
            <span className="label text-[9px] tracking-[0.3em] uppercase text-muted/50">
              {config.gender === 'female' ? 'Féminin' : 'Masculin'}
              {' · '}
              {config.bodyType === 'slim' ? 'Fine' : config.bodyType === 'curvy' ? 'Généreuse' : 'Moyenne'}
            </span>
          </motion.div>
        </div>

        {/* Side panel */}
        <div className="w-72 xl:w-80 flex-shrink-0 border-l border-border overflow-hidden">
          <ClothingPanel />
        </div>
      </div>

      {/* Modals */}
      <CulturalModal />
      <CaptureModal />
      <WardrobePanel />

      {/* Modal Publier */}
      <AnimatePresence>
        {showPublish && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPublish(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm mx-4 border border-[#C9A84C]/30 p-8"
              style={{ background: '#0A0A0A' }}
            >
              {published ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#C9A84C]/40"
                       style={{ background: '#C9A84C15' }}>
                    <svg viewBox="0 0 20 20" className="w-6 h-6 text-gold" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  </div>
                  <h3 className="serif text-xl font-light text-[#FAFAF8] mb-2">Publié !</h3>
                  <p className="text-[#FAFAF8]/40 text-xs mb-6">Ta création est visible dans la communauté.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setShowPublish(false)}
                      className="flex-1 py-3 border border-[#FAFAF8]/10 label text-[0.6rem] tracking-widest uppercase text-[#FAFAF8]/40 hover:border-[#FAFAF8]/20 transition-all">
                      Fermer
                    </button>
                    <button onClick={() => { setShowPublish(false); setScreen('community'); }}
                      className="flex-1 py-3 label text-[0.6rem] tracking-widest uppercase font-medium transition-all"
                      style={{ background: '#C9A84C', color: '#030303' }}>
                      Voir la galerie
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                       style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}/>
                  <h3 className="serif text-xl font-light text-[#FAFAF8] mb-1">Publier ma création</h3>
                  <p className="text-[#FAFAF8]/30 text-xs mb-6">Partage ton look avec la communauté ASA.</p>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="label text-[0.58rem] tracking-[0.3em] uppercase text-[#FAFAF8]/35 block mb-1.5">
                        Nom du look
                      </label>
                      <input
                        value={publishName} onChange={e => setPublishName(e.target.value)}
                        placeholder="Ex: Reine de Dakar"
                        className="w-full bg-transparent border border-[#FAFAF8]/10 text-[#FAFAF8] text-sm
                                   px-3 py-2.5 outline-none focus:border-[#C9A84C]/50 placeholder-[#FAFAF8]/18 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="label text-[0.58rem] tracking-[0.3em] uppercase text-[#FAFAF8]/35 block mb-1.5">
                        Tags (séparés par des virgules)
                      </label>
                      <input
                        value={publishTags} onChange={e => setPublishTags(e.target.value)}
                        placeholder="Ex: Nigeria, Cérémonie, Wax"
                        className="w-full bg-transparent border border-[#FAFAF8]/10 text-[#FAFAF8] text-sm
                                   px-3 py-2.5 outline-none focus:border-[#C9A84C]/50 placeholder-[#FAFAF8]/18 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setShowPublish(false)}
                      className="flex-1 py-3 border border-[#FAFAF8]/10 label text-[0.6rem] tracking-widest
                                 uppercase text-[#FAFAF8]/35 hover:border-[#FAFAF8]/20 transition-all">
                      Annuler
                    </button>
                    <button
                      disabled={!publishName.trim()}
                      onClick={() => {
                        const tags = publishTags.split(',').map(t => t.trim()).filter(Boolean);
                        publish(
                          currentUser?.name ?? 'Anonyme',
                          publishName.trim(),
                          config, equipped, tags
                        );
                        setPublished(true);
                        setPublishName('');
                        setPublishTags('');
                      }}
                      className="flex-1 py-3 label text-[0.6rem] tracking-widest uppercase font-medium
                                 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110"
                      style={{ background: '#C9A84C', color: '#030303' }}
                    >
                      Publier
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
