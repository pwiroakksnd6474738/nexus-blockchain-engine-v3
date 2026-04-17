package main

import (
	"sync"
	"time"
)

type Validator struct {
	ID        string
	Stake     float64
	Online    bool
	LastSeen  int64
}

type ValidatorNodeManager struct {
	mu        sync.RWMutex
	validators map[string]*Validator
}

func NewValidatorManager() *ValidatorNodeManager {
	return &ValidatorNodeManager{
		validators: make(map[string]*Validator),
	}
}

func (v *ValidatorNodeManager) Register(id string, stake float64) {
	v.mu.Lock()
	defer v.mu.Unlock()
	v.validators[id] = &Validator{
		ID:       id,
		Stake:    stake,
		Online:   true,
		LastSeen: time.Now().Unix(),
	}
}

func (v *ValidatorNodeManager) Heartbeat(id string) bool {
	v.mu.Lock()
	defer v.mu.Unlock()
	val, ok := v.validators[id]
	if !ok {
		return false
	}
	val.LastSeen = time.Now().Unix()
	val.Online = true
	return true
}

func (v *ValidatorNodeManager) CountActive() int {
	v.mu.RLock()
	defer v.mu.RUnlock()
	cnt := 0
	for _, val := range v.validators {
		if val.Online {
			cnt++
		}
	}
	return cnt
}
